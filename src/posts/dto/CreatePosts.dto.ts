
import { IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";
import { Types } from "mongoose";

export class createPostDto {

    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    titulo: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(500)
    conteudo: string;
 
    @IsNotEmpty()
    author: Types.ObjectId;

}