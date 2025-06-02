import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class createPostDto {

    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    titulo: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(500)
    conteudo: string;

    @IsString()
    @IsNotEmpty()
    autorid: string;

}