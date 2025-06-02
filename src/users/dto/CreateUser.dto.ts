
//representa o proprio objeto na sua trasferencia com o banco de dados
// ela é uma classe usada para definir o formato dos dados que são enviados

import { Type } from "class-transformer";
import { IsDate, IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength, ValidateNested } from "class-validator";
import { Types } from "mongoose";
import { createUserSettingsDto } from "./CreateUserSettings.dto";


// classe de addinfo

export class userAddInfoDTO{

@IsDate()
@IsOptional()
@Type(()=> Date) //converte string em data
datanascimento?: Date;

@IsOptional()
@IsString()
bio?: string;

@IsOptional()
@IsString()
idioma?: string;

@IsOptional()
@IsString()
redessociais?: string

}

// usada para validações, padronização, separar responsabilidades e evitar que dados inseguros passem adiate
export class createUserDTO {
  

   //os campos que se espera que serão transferidos

   @IsNotEmpty() //decoradores do pacote de validador/auto explicativo
   @IsString()
   nomeUsuario:string

   @IsNotEmpty()
   @IsString()
   apelido: string

   @IsNotEmpty()
   @IsEmail()
   email: string;

   @IsNotEmpty()
   @IsString()
   @MinLength(8)
   @MaxLength(12)
   senha: string;

   @IsOptional()
   // @ValidateNested(): não e necessario porque so to enviando um ID, se fosse um objeto inteiro então sim seria util 
   //@Type(()=> createUserSettingsDto): indica a classe que sera usada para trasnformar o objeto(nao util pelo mesmo motivo acima)

   //o dto nao deve conhecer a estrutura do schema (userSettings), só o fomato esperado que é um tipo Id do mongo (objectId)
   settings?: Types.ObjectId; // apenas o ID do documento vai estar presente ali, referência simples e leve, ideal para relacionamentos externos.
   
   //Outro caso:
   //settings?: createUserSettingsDto; : basicamente dizendo que quando criar usuario o objeto de configuração 
   // vai ta junto , dados completos, ideal para subdocumentos ou criações simultâneas.

   @IsOptional()
   @ValidateNested()
   @Type(()=>userAddInfoDTO)
   additionalinfo?: userAddInfoDTO;
   
}
