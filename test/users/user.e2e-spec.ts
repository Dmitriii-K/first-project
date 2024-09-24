import request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../../src/app.module'; // Убедитесь, что путь к модулю правильный
import { setupTestDB, teardownTestDB } from './setup';
import { UserInputModel } from 'src/features/users/api/models/input.models';


describe('UserController (e2e)', () => {
    let app: INestApplication;

    beforeAll(async () => {
    await setupTestDB();
    const moduleFixture: TestingModule = await Test.createTestingModule({
        imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    });

    afterAll(async () => {
    await teardownTestDB();
    await app.close();
    });

    describe('/users (GET)', () => {

    it('should return an array of users', async () => {
    const response = await request(app.getHttpServer())
        .get('/users')
        .set('Authorization', 'Basic YWRtaW46cXdlcnR5') // Убедитесь, что у вас есть правильный Basic Auth
        .expect(200);

    expect(response.body).toBeInstanceOf(Array);
    });
});

    describe('/users (POST)', () => {
        
    it('should create a new user', async () => {
    const userInput: UserInputModel = {
        login: 'testuser',
        password: 'password',
        email: 'test@example.com',
    };

    const response = await request(app.getHttpServer())
        .post('/users')
        .set('Authorization', 'Basic YWRtaW46cXdlcnR5')
        .send(userInput)
        .expect(201);

    expect(response.body).toHaveProperty('id');
    expect(response.body.login).toBe(userInput.login);
    expect(response.body.email).toBe(userInput.email);
    });

    it('should return 400 if user already exists', async () => {
    const userInput: UserInputModel = {
        login: 'testuser',
        password: 'password',
        email: 'test@example.com',
    };

    await request(app.getHttpServer())
        .post('/users')
        .set('Authorization', 'Basic YWRtaW46cXdlcnR5')
        .send(userInput)
        .expect(201);

    const response = await request(app.getHttpServer())
        .post('/users')
        .set('Authorization', 'Basic YWRtaW46cXdlcnR5')
        .send(userInput)
        .expect(400);

    expect(response.body.errorsMessages).toBeDefined();
    });
});

    describe('/users/:id (DELETE)', () => {

    it('should delete a user', async () => {
    const userInput: UserInputModel = {
        login: 'testuser',
        password: 'password',
        email: 'test@example.com',
    };

    const createResponse = await request(app.getHttpServer())
        .post('/users')
        .set('Authorization', 'Basic YWRtaW46cXdlcnR5')
        .send(userInput)
        .expect(201);

    const userId = createResponse.body.id;

    await request(app.getHttpServer())
        .delete(`/users/${userId}`)
        .set('Authorization', 'Basic YWRtaW46cXdlcnR5')
        .expect(204);

    const getResponse = await request(app.getHttpServer())
        .get(`/users/${userId}`)
        .set('Authorization', 'Basic YWRtaW46cXdlcnR5')
        .expect(404);

    expect(getResponse.body.message).toBe('User is not found');
    });

    it('should return 404 if user does not exist', async () => {
    await request(app.getHttpServer())
        .delete('/users/nonexistentid')
        .set('Authorization', 'Basic YWRtaW46cXdlcnR5')
        .expect(404);
    });
});
});