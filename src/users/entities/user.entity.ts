import { Exclude, Expose } from "class-transformer";
import { BeforeInsert, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, TableInheritance } from "typeorm";
var bcrypt = require('bcryptjs');

@Entity()
@TableInheritance({ column: { name: "role" } })
export class User {

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({unique: true})
    email: string

    @Column()
    firstName: string

    @Column()
    lastName: string

    get fullName() {
        return `${this.firstName} ${this.lastName}`;
    }

    @Exclude()
    @Column()
    role: string

    @CreateDateColumn()
    createdAt: Date;

}