import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SETTINGS } from './settings/app-settings';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(SETTINGS.PORT);
}
bootstrap();
