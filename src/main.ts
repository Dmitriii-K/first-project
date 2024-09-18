import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { appUse } from './app-use';
import { ConfigurationType } from './settings/configuration';

async function bootstrap() {
  // console.log(process.env.PORT)
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  appUse(app);

  // app.enableCors();//-
  // app.use(cookieParser());//-
  // useContainer(app.select(AppModule), { fallbackOnErrors: true });//-
  // app.useGlobalPipes(new ValidationPipe({
  //   transform: true,
  //   stopAtFirstError: true,
  //   forbidUnknownValues: false,
  //   exceptionFactory: (errors) => {
  //     const errorsForResponse:  { message: string, field: string }[]  = [] ;
  //     errors.forEach((e: any) => {
  //       if (e.constraints) {
  //         const constraintsKey = Object.keys(e.constraints);
  //         constraintsKey.forEach((ckey) => {
          
  //           errorsForResponse.push({ message: e.constraints[ckey], field: e.property });
  //         });
  //       }
  //     });
  //     throw new BadRequestException(errorsForResponse);
  //   }
  // }));//-
  // app.useGlobalFilters(new HttpExceptionFilterTest());//-

  const configService = app.get(ConfigService<ConfigurationType, true>);
  const apiSettings = configService.get('apiSettings',{infer:true})
  console.log(apiSettings.PORT)
  await app.listen(apiSettings.PORT);
  // await app.listen(SETTINGS.PORT);
}
bootstrap();

// "test:e2e": "jest --config ./test/jest-e2e.json"