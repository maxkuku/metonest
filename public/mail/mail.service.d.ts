import { MailerService } from '@nestjs-modules/mailer';
import { News } from '../news/news.interface';
export declare class MailService {
    private readonly mailerService;
    constructor(mailerService: MailerService);
    sendNewNewsForAdmins(emails: string[], news: News): Promise<void>;
    sendTest(): Promise<void>;
}
