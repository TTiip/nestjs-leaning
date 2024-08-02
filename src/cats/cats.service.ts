import { Model } from 'mongoose';
import { Injectable, HttpException, HttpStatus, Body } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateCatDto, UpdateCatDto } from './dto';
import { Cat } from './schemas';
import type { CatType } from './interfaces';
import { getResponseData } from '../utils';

@Injectable()
export class CatsService {
  constructor(@InjectModel(Cat.name) private catModel: Model<Cat>) {}

  async create(@Body() cat: CreateCatDto): Promise<CreateCatDto> {
    try {
      const createdCat = new this.catModel(cat);
      const r = await createdCat.save();

      const keysOfCatType = Object.keys({} as CatType);
      return getResponseData(r, keysOfCatType);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(): Promise<UpdateCatDto[]> {
    return this.catModel.find().exec();
  }
}
