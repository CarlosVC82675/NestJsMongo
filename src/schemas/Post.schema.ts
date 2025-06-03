import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { User } from "./User.schema";

@Schema()
export class Post{

@Prop({required:true})    
titulo: string;

@Prop({required:true})
conteudo: string;

@Prop({required:true, type: mongoose.Schema.Types.ObjectId, ref: 'User'})
author: User;

}

export const PostSchema = SchemaFactory.createForClass(Post);