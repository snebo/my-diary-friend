import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: 'http://localhost:3001', credentials: true });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalInterceptors(new ResponseInterceptor());
  // app.enableCors({
  //   origin: (origin, callback) => {
  //     const allowed = [
  //       'http://localhost:3001',
  //       'https://personalized-ai-frontend.vercel.app',
  //     ];
  //     const isVercelPreview =
  //       origin &&
  //       /^https:\/\/personalized-ai-frontend-.*\.vercel\.app$/.test(origin);

  //     if (!origin || allowed.includes(origin) || isVercelPreview) {
  //       callback(null, true);
  //     } else {
  //       callback(new Error('Not allowed by CORS'));
  //     }
  //   },
  //   credentials: true,
  // });

  app.enableCors({
    origin: '*',
    credentials: false,
  });

  app.useLogger(logger);
  await app.listen(process.env.PORT ?? 3000);
  logger.log(`Application running on ${await app.getUrl()}`);
}
bootstrap();
