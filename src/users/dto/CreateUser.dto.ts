
//representa o proprio objeto na sua trasferencia com o banco de dados
// ela é uma classe usada para definir o formato dos dados que são enviados

import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

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

   
}
