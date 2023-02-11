import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './services/app.service';
import { TelegramBotService } from './services/telegram-bot.service';

@Module({
  imports: [
    HttpModule.register({
      headers: {
        Accept: '*/*',
        'Accept-Encoding': 'gzip, deflate, compress',
        'Content-Type': 'application/json',
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService, TelegramBotService],
})
export class AppModule {}
