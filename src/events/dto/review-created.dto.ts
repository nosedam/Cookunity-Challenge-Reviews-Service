import { Review } from "src/reviews/entities/review.entity";

export class ReviewCreatedEvent extends Review {

    averageMealRating?: number
    
}