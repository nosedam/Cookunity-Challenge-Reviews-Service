import { ApiHideProperty } from "@nestjs/swagger"
import { IsInt, IsPositive, IsUUID, Max, Min } from "class-validator"
import { Customer } from "src/customers/entities/customer.entity"
import { User } from "src/users/entities/user.entity"

export class CreateReviewDto {

    @IsUUID()
    mealId: string

    @IsInt()
    @Min(1)
    @Max(5)
    rating: number

    @ApiHideProperty()
    customer?: Customer
}
