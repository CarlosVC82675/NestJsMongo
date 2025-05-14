import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()

export class UserAddInfo extends Document {

@Prop({type: Date, required: false})
datanascimento: Date;

@Prop({required: false})
bio: string;

@Prop({required:false})
idioma: string;

@Prop({required:false})
redessociais: string

}

export const userAddInfo = SchemaFactory.createForClass(UserAddInfo);