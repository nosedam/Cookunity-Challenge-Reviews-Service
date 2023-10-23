import { Controller, Get, Post, Body, Req } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/role.enum';
import { LoggingService } from 'src/logging/logging.service';
import { Customer } from 'src/customers/entities/customer.entity';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Review } from './entities/review.entity';
import { Request } from 'express';
import { plainToInstance } from 'class-transformer';


@ApiTags('reviews')
@ApiBearerAuth()
@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService, private loggingService: LoggingService) {}

  @Roles(Role.Customer)
  @ApiOperation({ summary: 'Create a review for a specific meal' })
  @ApiCreatedResponse({type: Review, isArray: false})
  @Post()
  async create(@Body() createReviewDto: CreateReviewDto, @Req() req: Request) {
    const customer = plainToInstance(Customer, req.user)
    createReviewDto.customer = customer
    return this.reviewsService.create(createReviewDto);
  }

  @Get()
  @ApiOperation({ summary: 'View all reviews' })
  @ApiOkResponse({type: Review, isArray: true})
  findAll() {
    return this.reviewsService.findAll();
  }

}
