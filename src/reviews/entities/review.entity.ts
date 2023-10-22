import { Exclude } from "class-transformer";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Review {
    
    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable: false})
    mealId: number

    @Column({nullable: false})
    @Exclude()
    customerId: number

    @Column({nullable: false})
    customerName: string

    @Column({nullable: false})
    rating: number

}
