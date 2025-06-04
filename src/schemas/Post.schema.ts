import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Types } from "mongoose";
import { User } from "./User.schema";


@Schema()
export class Post{

@Prop({required:true})    
titulo: string;

@Prop({required:true})
conteudo: string;

//Outro lado da relação de um pra muitos
@Prop({required:true, type: mongoose.Schema.Types.ObjectId, ref: 'User'})
author: Types.ObjectId;


//Relação de muitos pra muitos
@Prop({type:[{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]})
likes?: Types.ObjectId[];

}

export const PostSchema = SchemaFactory.createForClass(Post);