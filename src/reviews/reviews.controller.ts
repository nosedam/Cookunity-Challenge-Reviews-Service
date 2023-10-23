import { Controller, Get, Post, Body, Req, ClassSerializerInterceptor, UseInterceptors } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/role.enum';
import { User } from 'src/users/entities/user.entity';
import { LoggingService } from 'src/logging/logging.service';
import { plainToInstance } from 'class-transformer';
import { Customer } from 'src/customers/entities/customer.entity';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { Review } from './entities/review.entity';

@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('reviews')
@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService, private loggingService: LoggingService) {}

  @Roles(Role.Customer)
  @ApiCreatedResponse({type: Review, isArray: false})
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
