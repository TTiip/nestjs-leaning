import { Injectable } from '@nestjs/common';
import { CreateCatDto, UpdateCatDto } from './dto';

@Injectable()
export class CatsService {
  private readonly cats: UpdateCatDto[] = [
    {
      name: '11',
      age: 18,
      breed: '11',
    },
  ];

  create(cat: CreateCatDto) {
    this.cats.push(cat);
  }

  findAll(): UpdateCatDto[] {
    return this.cats;
  }
}
