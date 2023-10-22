import { Exclude } from "class-transformer";
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn, TableInheritance } from "typeorm";
var bcrypt = require('bcryptjs');

@Entity()
@TableInheritance({ column: { name: "role" } })
export class User {

    @BeforeInsert()
    async hashPassword() {
        if (this.password) {
            const salt = bcrypt.genSaltSync();
            this.password = bcrypt.hashSync(this.password, salt);
        }
    }
  
    @PrimaryGeneratedColumn()
    id: number

    @Column({unique: true})
    email: string

    @Column()
    @Exclude()
    password: string

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column()
    role: string

}