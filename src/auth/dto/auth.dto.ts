import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";


export class AuthDto {
    @ApiProperty({
        example: "m2rtyaman@gmail.com"
    })
    @IsEmail()
    @IsNotEmpty()
    email: string
    @IsString()
    @ApiProperty({
        example: "12345"
    })
    @IsNotEmpty()
    password: string
}