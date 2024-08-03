import { Model } from 'mongoose';
import { Injectable, HttpException, HttpStatus, Body } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateCatDto, UpdateCatDto } from './dto';
import { Cat } from './schemas';
import { transFormData } from '../utils';

@Injectable()
export class CatsService {
  constructor(@InjectModel(Cat.name) private catModel: Model<Cat>) {}

  async create(@Body() cat: CreateCatDto): Promise<CreateCatDto> {
    try {
      const createdCat = new this.catModel(cat);
      const r = await createdCat.save();
      // 转化成一个 普通的 JavaScript 对象(很重要!! 方便后续对数据进行处理)
      const jsObjResult = await r.toObject()

      return transFormData(jsObjResult);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(): Promise<UpdateCatDto[]> {
    return this.catModel.find().exec();
  }
}
