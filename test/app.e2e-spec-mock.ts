import { Test, TestingModule, TestingModuleBuilder } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { EmailService } from 'src/infrastructure/adapters/sendEmail';

// describe('AppController (e2e)', () => {
//   let app: INestApplication;
//   let httpServer: any

//   beforeEach(async () => {
//     const moduleFixture: TestingModule = await Test.createTestingModule({
//       imports: [AppModule],
//     })
//     .overrideProvider(EmailService)
//     .useClass(EmailServiceMock)
//     .compile();

//     app = moduleFixture.createNestApplication();
//     appSettings(app);
//     await app.init();
//     httpServer = app.getHttpServer()
//   });

//   export class EmailServiceMock implements EmailService {

//     sendMail(email: string, confirmationCode: string): Promise<void> {
//       throw new Error('Method not implemented.');
//     }
//     sendPasswordRecoveryMail(email: string, recoveryCode: string): Promise<void> {
//       throw new Error('Method not implemented.');
//     }
//     async sendConfirmation(
//       email: string,
//       confirmationCode: string
//     ): Promise <void>{
//       await Promise.resolve()
//     }
//     async sendRecoveriCode(user: any): Promise<void>{
//       await Promise.resolve()
//     }
//   }
// })