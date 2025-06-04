import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document, Types } from "mongoose";
import * as bcrypt from 'bcrypt';
import { UserSettings } from "./UserSettings.schema";
import { UserAddInfo } from "./UserAddInfo.schema";
import { Post } from "./Post.schema";
import { ref } from "process";

@Schema()
export class User extends Document{
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

   @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'UserSettings'})
   settings?: UserSettings;

   @Prop({type: UserAddInfo, required: false})
   additionalinfo?: UserAddInfo;

   // Relacionamente de um para muito, um usuario para muitas postagens
   // [] a matriz se refere a varias postagens que o usuario podera fazer
   // no moongo, isso vai ser uma matriz de ids e nao de objetos
   @Prop({type:[{type: mongoose.Schema.Types.ObjectId, ref: 'Post'}]})
    posts?: Types.ObjectId[];

   //Relação de muitos pra muitos
   @Prop({type:[{type: mongoose.Schema.Types.ObjectId, ref: 'Post'}]})
   likedPost?: Types.ObjectId[];


}

export const UserSchema = SchemaFactory.createForClass(User); 
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