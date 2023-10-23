import { ExecutionContext } from "@nestjs/common";
import { randomInt } from "crypto"
import { CreateReviewDto } from "src/reviews/dto/create-review.dto"
import {v4 as uuidv4} from 'uuid';

export class CustomerJWTGuardMock {
    canActivate (context: ExecutionContext) {
        const req = context.switchToHttp().getRequest();
        req.user = {
            id: uuidv4(),
            email: uuidv4() + "@mail.com",
            role: "customer",
            firstName: "customer",
            lastName: "test",
        }
        return true;
      }
}

export class ChefJWTGuardMock {
    canActivate (context: ExecutionContext) {
        const req = context.switchToHttp().getRequest();
        req.user = {
            id: uuidv4(),
            email: "chef@mail.com",
            role: "chef",
            firstName: "chef",
            lastName: "test",
        };
        return true;
      }
}

export class LoggingServiceMock {
    log() {
    }
}

export class EventsServiceMock {
    publishEvent(event: any, data: any) {}
}

export const mockCreateReviewDto: CreateReviewDto = {
    mealId: uuidv4(),
    rating: randomInt(1,5),
}