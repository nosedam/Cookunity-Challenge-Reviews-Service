import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmConfigService } from 'src/typeorm.config';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { EventsServiceMock, CustomerJWTGuardMock, LoggingServiceMock, mockCreateReviewDto, ChefJWTGuardMock } from './mocks';
import { RolesGuard } from 'src/roles/roles.guard';
import { LoggingService } from 'src/logging/logging.service';
import { EventsService } from 'src/events/events.service';
import { ReviewsController } from 'src/reviews/reviews.controller';

describe('AppController for customers (e2e)', () => {
  let app: INestApplication;
  let reviewsController: ReviewsController

  afterAll(async () => {
    await app.close()
  });

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        {
          module: AppModule,
          providers: [
            {
              provide: JwtAuthGuard,
              useClass: CustomerJWTGuardMock
            },
            {
              provide: LoggingService,
              useClass: LoggingServiceMock
            },
            {
              provide: EventsService,
              useClass: EventsServiceMock
            }
          ]
        },
        TypeOrmModule.forRootAsync({
          imports: [ConfigModule],
          useClass: TypeOrmConfigService
        })
      ],
    })
      .compile();

    app = moduleFixture.createNestApplication();

    reviewsController = await app.resolve(ReviewsController)

    await app.init();
  });

  it('view reviews', async () => {
    const reviews = await request(app.getHttpServer()).get('/reviews')
    expect(reviews.status).toEqual(200)
    expect(reviews.body).toBeDefined()
  });
  
  it('creates a review as a customer', async () => {
    const reviews = await request(app.getHttpServer()).post('/reviews').send(mockCreateReviewDto)
    expect(reviews.status).toEqual(201)
    expect(reviews.body).toBeDefined()
  });

});

describe('AppController for chefs (e2e)', () => {
  let app: INestApplication;
  let reviewsController: ReviewsController

  afterAll(async () => {
    await app.close()
  });

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        {
          module: AppModule,
          providers: [
            {
              provide: JwtAuthGuard,
              useClass: ChefJWTGuardMock
            },
            {
              provide: LoggingService,
              useClass: LoggingServiceMock
            },
            {
              provide: EventsService,
              useClass: EventsServiceMock
            }
          ]
        },
        TypeOrmModule.forRootAsync({
          imports: [ConfigModule],
          useClass: TypeOrmConfigService
        })
      ],
    })
      .compile();

    app = moduleFixture.createNestApplication();

    reviewsController = await app.resolve(ReviewsController)

    await app.init();
  });

  it('view reviews', async () => {
    const reviews = await request(app.getHttpServer()).get('/reviews')
    expect(reviews.status).toEqual(200)
    expect(reviews.body).toBeDefined()
  });
  
  it('blocks review creation for chefs', async () => {
    const reviews = await request(app.getHttpServer()).post('/reviews').send(mockCreateReviewDto)
    expect(reviews.status).toEqual(403)
  });

});
