import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommentsModule } from './news/comments/comments.module';
import { NewsModule } from './news/news.module';
import { UserModule } from './user/user.module';
import { MailModule } from './mail/mail.module';
import { AuthModule } from './auth/auth.module';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqljs',
      location:
        process.env.NODE_ENV === 'test'
          ? undefined
          : process.env.DB_PATH || 'metonest.sqlite',
      autoSave: process.env.NODE_ENV !== 'test',
      autoLoadEntities: true,
      synchronize: true,
    }),
    UserModule,
    AuthModule,
    CategoriesModule,
    CommentsModule,
    MailModule,
    NewsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
