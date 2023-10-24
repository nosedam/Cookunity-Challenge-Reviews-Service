import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose } from "class-transformer";
import { Customer } from "src/customers/entities/customer.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Review {
    
    @ApiProperty()
    @PrimaryGeneratedColumn("uuid")
    id: string

    @ApiProperty()
    @Column({nullable: false})
    mealId: string

    @ApiHideProperty()
    @ManyToOne(type => Customer, (customer) => customer.reviews)
    @Exclude()
    customer: Customer

    @Expose()
    @ApiProperty()
    get customerName(): string {
        return `${this.customer?.firstName} ${this.customer?.lastName}`
    }

    @ApiProperty()
    @Column({nullable: false})
    rating: number

    @CreateDateColumn()
    createdAt: Date;

}
