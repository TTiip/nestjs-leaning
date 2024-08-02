import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CatDocument = HydratedDocument<Cat>;

@Schema({
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  },
})
export class Cat {
  @Prop({ type: String, required: true })
  userName;

  @Prop({ type: String, required: true })
  passWord;

  @Prop({ type: String, required: true })
  name;

  @Prop({ type: Number, required: true })
  age;

  @Prop({ type: Date, default: new Date() })
  time?;
}

export const CatSchema = SchemaFactory.createForClass(Cat);
