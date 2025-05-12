import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class userSettings {

@Prop({required: false})
recebernotificacao?: boolean;

@Prop({required:false})
receberemails?: boolean;

@Prop({ required:false})
receberSMS?: boolean;

}

export const userSettingsSchema = SchemaFactory.createForClass(userSettings);




