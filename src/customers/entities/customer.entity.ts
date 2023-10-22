import { Review } from "src/reviews/entities/review.entity";
import { Role } from "src/roles/role.enum";
import { User } from "src/users/entities/user.entity";
import { ChildEntity, Entity, OneToMany } from "typeorm";

@ChildEntity(Role.Customer)
export class Customer extends User {

    @OneToMany(type => Review, (review) => review.customer)
    reviews: Review[]

}
