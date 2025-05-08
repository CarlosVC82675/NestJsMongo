import { IsOptional, IsString } from "class-validator";

export class updateUserDTO{

    @IsOptional()
    @IsString()
    apelido?: string;

    @IsOptional()
    @IsString()
    avatarUrl?: String;
    

}