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
  UseGuards,
} from '@nestjs/common';
import { CreateCatDto, UpdateCatDto } from './dto';
import type { CatType } from './interfaces';
import { CatsService } from './cats.service';
import { ConfigService } from '@nestjs/config';
import { LoginGuard } from '../guards/login.guard'
import { md5 } from '../utils'

@Controller('cats')
export class CatsController {
  constructor(
    private catsService: CatsService,
    private configService: ConfigService,
  ) {}

  @Post()
  // 建议不要随便改 - 避免乱了
  @HttpCode(200)
  @UseGuards(LoginGuard)
  create(@Body() createCatDto: CreateCatDto, @Headers() headers) {
    // console.log(this.catsService, 'this.catsService')
    // console.log(headers, 'headers');
    // console.log(createCatDto, 'createCatDto');
    // console.log(this.configService.get('MONGODB_URL'), 'MONGODB_URL');
    // console.log(process.env.NODE_ENV, 'process.env.NODE_ENV');
    createCatDto.passWord = md5(createCatDto.passWord)
    return this.catsService.create(createCatDto);
  }

  @Get()
  findAll(): Promise<CatType[]> {
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
