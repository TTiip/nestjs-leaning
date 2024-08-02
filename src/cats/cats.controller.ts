import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  HttpCode,
  Headers,
} from '@nestjs/common';
import { CreateCatDto, UpdateCatDto } from './dto';
import type { Cat } from './interfaces';
import { CatsService } from './cats.service';
import { ConfigService } from '@nestjs/config';

@Controller('cats')
export class CatsController {
  constructor(
    private catsService: CatsService,
    private configService: ConfigService,
  ) {}

  @Post()
  @HttpCode(200)
  create(@Body() createCatDto: CreateCatDto, @Headers() headers) {
    console.log(headers, 'headers');
    console.log(createCatDto, 'createCatDto');
    console.log(this.configService.get('MONGODB_URL'), 'MONGODB_URL');
    console.log(process.env.NODE_ENV, 'process.env.NODE_ENV');
    this.catsService.create(createCatDto);
  }

  @Get()
  findAll(): Cat[] {
    return this.catsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return `This action returns a #${id} cat`;
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
    console.log(updateCatDto, 'updateCatDto');
    return `This action updates a #${id} cat`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes a #${id} cat`;
  }
}
