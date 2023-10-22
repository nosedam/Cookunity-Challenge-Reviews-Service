import { Exclude } from "class-transformer";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Review {
    
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({nullable: false})
    mealId: string

    @Column({nullable: false})
    @Exclude()
    customerId: string

    @Column({nullable: false})
    customerName: string

    @Column({nullable: false})
    rating: number

}
