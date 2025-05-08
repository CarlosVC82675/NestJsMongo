import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Profile extends Document {
  @Prop({ required: true })
  bio: string;

  @Prop()
  avatarUrl: string;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
