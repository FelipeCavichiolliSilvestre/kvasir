import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { ErrorInterceptor } from './shared';
import { join } from 'path';
import { engine } from 'express-handlebars';
import * as cookieParser from 'cookie-parser';
import { AuthGuard, AuthModule } from './modules/auth';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.engine(
    'hbs',
    engine({
      extname: 'hbs',
      partialsDir: join(__dirname, '..', 'views', 'partials'),
      defaultLayout: false,
    }),
  );

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');

  app.use(cookieParser());

  app.useGlobalGuards(app.select(AuthModule).get(AuthGuard));
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalInterceptors(new ErrorInterceptor());

  await app.listen(3000);
}
bootstrap();
