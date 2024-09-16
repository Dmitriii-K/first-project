import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { appUse } from './app-use';

async function bootstrap() {
  console.log(process.env.PORT)
  const app = await NestFactory.create(AppModule);
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

  const configService = app.get(ConfigService);
  const port = configService.get('apiSettings', {infer: true,});
  await app.listen(port);
  // await app.listen(SETTINGS.PORT);
}
bootstrap();

// "test:e2e": "jest --config ./test/jest-e2e.json"