import { IsInt, IsPositive, IsUUID, Max, Min } from "class-validator"
import { User } from "src/users/entities/user.entity"

export class CreateReviewDto {

    @IsUUID()
    mealId: string

    @IsInt()
    @Min(1)
    @Max(5)
    rating: number

    customerId: string
    customerName: string
}
