import { IsEmail, IsEnum, IsString, IsStrongPassword, MinLength } from "class-validator";
import { Role } from "src/roles/role.enum";

export class CreateUserDto {

    @IsString()
    @IsStrongPassword({minLength:8, minLowercase:1, minNumbers:1, minSymbols:0, minUppercase:0})
    password: string

    @IsEmail()
    email: string

    @IsString()
    @MinLength(3)
    firstName: string

    @IsString()
    @MinLength(3)
    lastName: string

    @IsEnum(Role)
    role: string
    
}
