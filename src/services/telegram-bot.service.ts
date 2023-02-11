import { Injectable } from '@nestjs/common';
import { uniq } from 'lodash';
import * as TelegramBot from 'node-telegram-bot-api';

const BOT_TOKEN = '6184820169:AAGv0Akax6OAxUC10cqbYZgiVQQWQ-S_eh4';

@Injectable()
export class TelegramBotService {
  private __subscribers: number[] = [];
  private __bot: TelegramBot;

  constructor() {
    this.__bot = new TelegramBot(BOT_TOKEN, { polling: true });
  }

  sendMessageToSubscribers(message: string): void {
    this.__subscribers.forEach((subscriber) => {
      this.__bot.sendMessage(subscriber, message);
    });
  }

  onApplicationBootstrap() {
    this.__bot.on('message', (msg) => {
      const chatId = msg.chat.id;
      this.__subscribers = uniq([...this.__subscribers, chatId]);
      this.__bot.sendMessage(chatId, 'You have registered to Bazaraki Updates');
    });
  }
}
