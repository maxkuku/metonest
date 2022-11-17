import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
//import * as express from 'express';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as expressHbs from 'express-handlebars';
import { join } from 'path';
import * as hbs from 'hbs';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  app.useStaticAssets(join(__dirname, '..', 'dist'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.set('view engine', 'hbs');
  hbs.registerPartials;
  app.engine(
    'hbs',
    expressHbs.engine({
      layoutsDir: join(__dirname, '..', 'views/layouts'),
      defaultLayout: 'layout',
      extname: 'hbs',
    }),
  );

  await app.listen(3000);
}
bootstrap();
