import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { CatsModule } from './cats/cats.module';
import { AppService } from './app.service';

@Module({
  imports: [CatsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
