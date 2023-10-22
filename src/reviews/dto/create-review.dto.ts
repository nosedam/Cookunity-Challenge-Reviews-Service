import { IsInt, IsPositive, Max, Min } from "class-validator"
import { User } from "src/users/entities/user.entity"

export class CreateReviewDto {

    @IsInt()
    @IsPositive()
    mealId: number

    @IsInt()
    @Min(1)
    @Max(5)
    rating: number

    customerId: number
    customerName: string
}
