import { Test, TestingModuleBuilder } from '@nestjs/testing';
import { AppModule } from '../../src/app.module';
import { UserServiceMockObject } from '../mock/user.service.mock';
import { Connection } from 'mongoose';
import { getConnectionToken } from '@nestjs/mongoose';
import { deleteAllData } from './delete-all-data';
import { UsersTestManager } from './users-test-manager';
import configuration from '../../src/settings/env/configuration-validation';
import { UserService } from 'src/features/users/application/user.service';

export const initSettings = async (
  //передаем callback, который получает ModuleBuilder, если хотим изменить настройку тестового модуля
    addSettingsToModuleBuilder?: (moduleBuilder: TestingModuleBuilder) => void,
) => {
    console.log('in tests ENV: ', configuration().environmentSettings.currentEnv);
    const testingModuleBuilder: TestingModuleBuilder = Test.createTestingModule({
    imports: [AppModule],
    })
    .overrideProvider(UserService)
    .useValue(UserServiceMockObject);

    if (addSettingsToModuleBuilder) {
    addSettingsToModuleBuilder(testingModuleBuilder);
    }

    const testingAppModule = await testingModuleBuilder.compile();

    const app = testingAppModule.createNestApplication();

    // applyAppSettings(app);

    await app.init();

    const databaseConnection = app.get<Connection>(getConnectionToken());
    const httpServer = app.getHttpServer();
    const userTestManger = new UsersTestManager(app);

    await deleteAllData(databaseConnection);

  //TODO:переписать через setState
    return {
    app,
    databaseConnection,
    httpServer,
    userTestManger,
    };
};