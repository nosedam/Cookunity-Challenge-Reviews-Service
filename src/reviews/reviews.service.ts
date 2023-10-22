import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './entities/review.entity';

@Injectable()
export class ReviewsService {

  constructor(@InjectRepository(Review) private reviewsRepository: Repository<Review>) {}

  async create(createReviewDto: CreateReviewDto) {
    const review = await this.reviewsRepository.findOneBy({customerId: createReviewDto.customerId, mealId: createReviewDto.mealId})
    if (review) {
      throw new HttpException("Can't create two reviews for the same meal", HttpStatus.CONFLICT)
    }
    return this.reviewsRepository.save(createReviewDto);
  }

  findAll() {
    return this.reviewsRepository.find();
  }

}
