import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class createBlogDto {
    @IsString()
    @ApiProperty({
        example:"TITLE 1"
    })
    @IsNotEmpty()
    title: string
    @IsNotEmpty()
    @ApiProperty({
        example:"CONTENT  1"
    })
    @IsString()
    content: string
}