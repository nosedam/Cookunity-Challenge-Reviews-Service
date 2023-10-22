import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { LoggingService } from 'src/logging/logging.service';
import { RequestService } from 'src/request/request.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    PassportModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get<string>("JWT_KEY"),
          signOptions: { expiresIn: '999999s'},
          // verifyOptions: {ignoreExpiration: true}
        }
      },
      inject: [ConfigService]
    })
  ],
  providers: [LoggingService, RequestService, JwtStrategy],
})
export class AuthModule {}
