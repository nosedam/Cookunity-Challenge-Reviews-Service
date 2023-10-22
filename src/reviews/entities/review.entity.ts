import { Exclude, Expose } from "class-transformer";
import { Customer } from "src/customers/entities/customer.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Review {
    
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({nullable: false})
    mealId: string

    @Exclude()
    @ManyToOne(type => Customer, (customer) => customer.reviews)
    customer: Customer

    @Expose()
    get customerName() {
        return `${this.customer.firstName} ${this.customer.lastName}`
    }

    @Column({nullable: false})
    rating: number

}
