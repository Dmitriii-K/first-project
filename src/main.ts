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
    stopAtFirstError: false,
    forbidUnknownValues: false,
    exceptionFactory: (errors) => {
      // @ts-ignore
      const errorsForResponse: OutputErrorsType = { errorsMessages: [] };
      errors.forEach((e) => {
        // @ts-ignore
        const constraintsKey = Object.keys(e.constraints);
        constraintsKey.forEach((ckey) => {
          // @ts-ignore
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
