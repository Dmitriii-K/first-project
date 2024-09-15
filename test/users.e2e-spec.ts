import { UsersTestManager } from './utils/users-test-manager';
import { INestApplication } from '@nestjs/common';
import { UserService } from 'src/features/users/application/user.service';
import request from 'supertest';
import { initSettings } from './utils/init-settings';
import { UserServiceMock } from './mock/user.service.mock';
import { UserRepository } from 'src/features/users/repository/user.repository';
import { AuthService } from 'src/features/auth/application/auth.service';

describe('users', () => {
    let app: INestApplication;
    let userTestManger: UsersTestManager;

    beforeAll(async () => {
    const result = await initSettings((moduleBuilder) =>
        //override UsersService еще раз
        moduleBuilder
        .overrideProvider(UserService)
        .useFactory({
            factory: (repo: UserRepository, authService: AuthService) => {
            return new UserServiceMock(repo, authService)
            }, inject: [UserRepository, AuthService]

        }),
    );
    app = result.app;
    userTestManger = result.userTestManger;
    });

    afterAll(async () => {
    await app.close();
    });

    it('should create user', async () => {
    const body = { login: 'name1', password: 'qwerty', email: 'email@email.em' };

    const response = await userTestManger.createUser('123', body);

    expect(response.body).toEqual({ login: body.login, email: body.email, id: expect.any(String), createdAt: expect.any(String) });
    });

    it('should get users', async () => {
    const body = { login: 'name2', password: 'qwerty', email: 'email2@email.em' };

    const createUserResponse = await userTestManger.createUser('123', body);

    const getUserResponse = await request(app.getHttpServer())
        .get(`/api/users`)
        .expect(200);

    expect(getUserResponse.body.totalCount).toBe(2);
    });
});