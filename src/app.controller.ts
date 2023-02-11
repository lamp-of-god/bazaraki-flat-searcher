import { Controller, Get } from '@nestjs/common';
import { FlatInfo } from './models/flat-info';
import { AppService } from './services/app.service';
import { TelegramBotService } from './services/telegram-bot.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly telegramBotService: TelegramBotService,
  ) {}

  @Get()
  async getHello(): Promise<void> {
    const flatsList = await this.appService.getList();

    if (flatsList.length === 0) return;

    flatsList.forEach((flat) => {
      this.telegramBotService.sendMessageToSubscribers(
        this.__buildMessageForFlat(flat),
      );
    });
  }

  private __buildMessageForFlat(flat: FlatInfo): string {
    return `Type: ${flat.flatType},
Price: ${flat.price}€,
https://bazaraki.com${flat.link}
${flat.dateAndLocation}`;
  }
}
