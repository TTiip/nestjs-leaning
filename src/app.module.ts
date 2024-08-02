import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { CatsModule } from './cats/cats.module';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import {
  CustomValidationPipe,
  HttpExceptionFilter,
  TransformInterceptor,
} from './core';

@Module({
  imports: [
    ConfigModule.forRoot({
      // !!! env 文件必须放置在项目根目录下，切记(一个下午的调试时间换来的提醒!!!)
      envFilePath:
        process.env.NODE_ENV === 'production'
          ? '.env.production'
          : '.env.development',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGODB_URL),
    CatsModule,
  ],
  controllers: [AppController],
  providers: [
    /** 全局错误过滤器 */
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    /** 全局自定义DTO校验管道 */
    {
      provide: APP_PIPE,
      useClass: CustomValidationPipe,
    },
    /** 全局的拦截器 */
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
    AppService,
  ],
})
export class AppModule {}
