import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from './entities/review.entity';
import { LoggingService } from 'src/logging/logging.service';
import { RequestService } from 'src/request/request.service';
import { EventsService } from 'src/events/events.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forFeature([Review]), ConfigModule],
  controllers: [ReviewsController],
  providers: [ReviewsService, LoggingService, RequestService, EventsService],
})
export class ReviewsModule {}
