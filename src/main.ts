import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { appUse } from './app-use';
import { ConfigurationType } from './settings/configuration';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  appUse(app);
  const configService = app.get(ConfigService<ConfigurationType, true>);
  const apiSettings = configService.get('apiSettings',{infer:true})
  console.log(apiSettings.PORT)//----------------------
  await app.listen(apiSettings.PORT);
  // await app.listen(SETTINGS.PORT);
}
bootstrap();

// "test:e2e": "jest --config ./test/jest-e2e.json"