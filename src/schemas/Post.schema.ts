import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Post{

@Prop({required:true})    
titulo: string;

@Prop({required:true})
conteudo: string;

}

export const PostSchema = SchemaFactory.createForClass(Post);