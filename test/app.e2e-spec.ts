import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let httpServer: any

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    httpServer = app.getHttpServer()
  });

  it('/ (GET)', () => {
    return request(httpServer)
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });
});

// const moduleFixture: TestingModule = await Test.createTestingModule({
//   imports: [AppModule],
// })
//   .overrideProvider(UsersService)
//   //.useValue(UserServiceMockObject)
//   .useClass(UserServiceMock)
//   .compile();