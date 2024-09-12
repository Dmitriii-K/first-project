import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SETTINGS } from './settings/app-settings';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './infrastructure/exception-filters/exception-filtrs';
import { OutputErrorsType } from './base/types/output-errors.types';
import { useContainer } from 'class-validator';
import { HttpExceptionFilterTest } from './infrastructure/exception-filters/exp-filtr-test';
import cookieParser from "cookie-parser"

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(cookieParser());
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    stopAtFirstError: true,
    forbidUnknownValues: false,
    exceptionFactory: (errors) => {
      const errorsForResponse:  { message: string, field: string }[]  = [] ;
      errors.forEach((e: any) => {
        if (e.constraints) {
          const constraintsKey = Object.keys(e.constraints);
          constraintsKey.forEach((ckey) => {
          
            errorsForResponse.push({ message: e.constraints[ckey], field: e.property });
          });
        }
      });
      throw new BadRequestException(errorsForResponse);
    }
  }));
  app.useGlobalFilters(new HttpExceptionFilterTest())
  // const configService = app.get(ConfigService);
  // const port = configService.get<number>('PORT');
  // await app.listen(port);
  await app.listen(SETTINGS.PORT);
}
bootstrap();