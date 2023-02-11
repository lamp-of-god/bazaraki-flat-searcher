import { Injectable } from '@nestjs/common';
import * as TelegramBot from 'node-telegram-bot-api';

const BOT_TOKEN = '6184820169:AAGv0Akax6OAxUC10cqbYZgiVQQWQ-S_eh4';

@Injectable()
export class TelegramBotService {
  private __subscribers: number[] = [152212370, 341752565];
  private __bot: TelegramBot;

  constructor() {
    this.__bot = new TelegramBot(BOT_TOKEN);
    // this.__bot = new TelegramBot(BOT_TOKEN, { polling: true });
  }

  sendMessageToSubscribers(message: string): void {
    this.__subscribers.forEach((subscriber) => {
      this.__bot.sendMessage(subscriber, message);
    });
  }
}
