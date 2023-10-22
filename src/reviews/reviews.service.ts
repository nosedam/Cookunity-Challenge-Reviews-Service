import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './entities/review.entity';
import { EventsService } from 'src/events/events.service';
import { EventTypes } from 'src/events/events.enum';
import { instanceToInstance } from 'class-transformer';
import { ReviewCreatedEvent } from 'src/events/dto/review-created.dto';

const MAX_REVIEW_RATING_DIGITS: number = 2

@Injectable()
export class ReviewsService {

  constructor(
    @InjectRepository(Review) private reviewsRepository: Repository<Review>,
    private eventsService: EventsService
  ) {}

  async create(createReviewDto: CreateReviewDto) {
    const review = await this.reviewsRepository.findOneBy({customerId: createReviewDto.customerId, mealId: createReviewDto.mealId})
    if (review) {
      throw new HttpException("Can't create two reviews for the same meal", HttpStatus.CONFLICT)
    }

    const savedReview = await this.reviewsRepository.save(createReviewDto)

    this.sendReviewCreatedEvent(savedReview)

    return savedReview;
  }

  averageRating(mealId: string) {
    return this.reviewsRepository.average('rating', {mealId: mealId})
  }

  findAll() {
    return this.reviewsRepository.find();
  }

  private async sendReviewCreatedEvent(review: Review) {
    let savedReviewEvent: ReviewCreatedEvent = review
    
    savedReviewEvent.averageMealRating = await this.averageRating(savedReviewEvent.mealId)
    savedReviewEvent.averageMealRating.toFixed(MAX_REVIEW_RATING_DIGITS)

    this.eventsService.publishEvent(EventTypes.ReviewCreated, savedReviewEvent)

  }

}
