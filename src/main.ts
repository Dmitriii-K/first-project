import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SETTINGS } from './settings/app-settings';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './infrastructure/exception-filters/exception-filtrs';
import { OutputErrorsType } from './base/types/output-errors.types';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    stopAtFirstError: true,
    forbidUnknownValues: false,
    exceptionFactory: (errors) => {
      const errorsForResponse: OutputErrorsType = [];
      errors.forEach((e) => {
        const constraintsKey = Object.keys(e.constraints);
        constraintsKey.forEach((ckey) => {
          errorsForResponse.errorsMessages.push({ message: e.constraints[ckey], field: e.property });
        });
      });
      throw new BadRequestException(errorsForResponse)
    }
  }));
  app.useGlobalFilters(new HttpExceptionFilter())
  await app.listen(SETTINGS.PORT);
}
bootstrap();
