import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './entities/review.entity';
import { EventsService } from 'src/events/events.service';
import { EventTypes } from 'src/events/events.enum';
import { ReviewCreatedEvent } from 'src/reviews/events/review-created.dto';
import { CustomersService } from 'src/customers/customers.service';
import { instanceToInstance } from 'class-transformer';

const MAX_REVIEW_RATING_DIGITS: number = 2

@Injectable()
export class ReviewsService {

  constructor(
    @InjectRepository(Review) private reviewsRepository: Repository<Review>,
    private eventsService: EventsService,
    private customersService: CustomersService
  ) {}

  async create(createReviewDto: CreateReviewDto) {
    const review = await this.reviewsRepository.findOneBy({customer: {id: createReviewDto.customer.id}, mealId: createReviewDto.mealId})
    if (review) {
      throw new HttpException("Can't create two reviews for the same meal", HttpStatus.CONFLICT)
    }

    await this.customersService.createOrUpdate(createReviewDto.customer)

    const savedReview = await this.reviewsRepository.save(createReviewDto)

    await this.sendReviewCreatedEvent(savedReview)

    return savedReview;
  }

  averageRating(mealId: string) {
    return this.reviewsRepository.average('rating', {mealId: mealId})
  }

  findAll() {
    return this.reviewsRepository.find({relations: ["customer"]});
  }

  private async sendReviewCreatedEvent(review: Review) {
    let savedReviewEvent: ReviewCreatedEvent = instanceToInstance<Review>(review)
    
    savedReviewEvent.averageMealRating = await this.averageRating(savedReviewEvent.mealId)
    savedReviewEvent.averageMealRating.toFixed(MAX_REVIEW_RATING_DIGITS)

    await this.eventsService.publishEvent(EventTypes.ReviewCreated, savedReviewEvent)
    
  }

}
