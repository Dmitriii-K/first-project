import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let server: INestApplication;
  let app: any

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    server = moduleFixture.createNestApplication();
    await server.init();
    app = server.getHttpServer()
  });

  it('/ (GET)', () => {
    return request(app)
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });
});
