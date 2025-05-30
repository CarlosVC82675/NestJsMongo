import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import * as bcrypt from 'bcrypt';

@Schema()
export class user extends Document{
   @Prop({required: true}) 
   nomeUsuario: string;

   @Prop({unique: true, required: true})
   apelido: string;

   @Prop({unique: true, required: true})
   email: string;

   @Prop({required: true})
   senha: string;

   @Prop({required: false})
   avatarUrl: String;

}

export const UserSchema = SchemaFactory.createForClass(user); 
//  transforma a classe user em um schema do Mongoose e criar um objeto "Userschema que pode ser usado para configurar comportamentos adicionais ou importalo"

console.log("aqui rodou pai(o shema de usuario no caso)");

//antes de salvar
UserSchema.pre('save', async function (next) {
    if(!this.isModified('senha')) return next(); // se ja foi modificado continue
    const salt = await bcrypt.genSalt(10); // gera um valor aleatorio(salt)
    this.senha = await bcrypt.hash(this.senha, salt); //substitui a senha pela criptografia
    console.log("deu bom aqui na criptografia");
    next(); //finalizar a função
})