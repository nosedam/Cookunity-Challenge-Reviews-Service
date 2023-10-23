import { Module, Scope } from '@nestjs/common';
import { AppService } from './app.service';
import { ReviewsModule } from './reviews/reviews.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmConfigService } from './typeorm.config';
import configuration from './config/configuration';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from './logging/logging.interceptor';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { RolesGuard } from './roles/roles.guard';
import { RequestService } from './request/request.service';
import { LoggingService } from './logging/logging.service';
import { AuthModule } from './auth/auth.module';
import { EventsService } from './events/events.service';
import { CustomersModule } from './customers/customers.module';

@Module({
  imports: [
    AuthModule,
    CustomersModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TypeOrmConfigService
    }
  ),
    ReviewsModule,
    ConfigModule.forRoot({
      load: [configuration],
    })

  ],
  providers: [
    AppService,
    LoggingService, 
    RequestService,
    {
      provide: APP_INTERCEPTOR,
      scope: Scope.REQUEST,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    EventsService,
  ],
})
export class AppModule {}
