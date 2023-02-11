import { AppService } from './services/app.service';
import { TelegramBotService } from './services/telegram-bot.service';
export declare class AppController {
    private readonly appService;
    private readonly telegramBotService;
    constructor(appService: AppService, telegramBotService: TelegramBotService);
    getHello(): Promise<void>;
    private __buildMessageForFlat;
}
