import { Controller, Get, Post, Body, Req, ClassSerializerInterceptor, UseInterceptors } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/role.enum';
import { User } from 'src/users/entities/user.entity';
import { LoggingService } from 'src/logging/logging.service';
import { plainToInstance } from 'class-transformer';
import { Customer } from 'src/customers/entities/customer.entity';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService, private loggingService: LoggingService) {}

  @Roles(Role.Customer)
  @Post()
  create(@Body() createReviewDto: CreateReviewDto, @Req() req) {
    const customer = plainToInstance(Customer, req.user)
    createReviewDto.customer = customer
    return this.reviewsService.create(createReviewDto);
  }

  @Get()
  findAll() {
    return this.reviewsService.findAll();
  }

}
