import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type UserDocument = User & Document

@Schema({ timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } })
export class User {
  @Prop({ required: true })
  userName: string

  @Prop({ required: true })
  passWord: string
}

export const UserSchema = SchemaFactory.createForClass(User)
