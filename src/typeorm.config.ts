import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
import { Review } from "./reviews/entities/review.entity";
import { Customer } from "./customers/entities/customer.entity";
import { User } from "./users/entities/user.entity";

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {

    constructor(private configService: ConfigService) {}

    createTypeOrmOptions(): TypeOrmModuleOptions {
        return {
            type: "mysql",
            host: this.configService.get<string>("DB_HOST"),
            port: this.configService.get<number>("DB_PORT"),
            username: this.configService.get<string>("DB_USERNAME"),
            password: this.configService.get<string>("DB_PASSWORD"),
            database: this.configService.get<string>("DB_DATABASE"),
            entities: [Review, Customer, User],
            synchronize: true,
        };
    }
}