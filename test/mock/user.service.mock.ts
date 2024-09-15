

//  .overrideProvider(UsersService)

import { AuthService } from "src/features/auth/application/auth.service";
import { UserService } from "src/features/users/application/user.service";
import { UserRepository } from "src/features/users/repository/user.repository";

//  .useValue(UserServiceMockObject)
export const UserServiceMockObject = {
    sendMessageOnEmail() {
    console.log('Call mock method sendMessageOnEmail / MailService');
    return Promise.resolve(true);
    },
    create() {
    return Promise.resolve('123');
    },
};

//  .overrideProvider(UsersService)
//  .useClass(UserServiceMock)
// or
// .overrideProvider(UsersService)
// .useFactory({
//      factory: (usersRepo: UsersRepository) => {
//          return new UserServiceMock(usersRepo);
//      },
//      inject: [UsersRepository]
//      }
//     )

export class UserServiceMock extends UserService {
    constructor(
        usersRepository: UserRepository,
        authService: AuthService,
    ) {
    super(usersRepository);
    }

    sendMessageOnEmail() {
    console.log(
        'Call mock method sendMessageOnEmail / MailService, for specific test',
    );
    return Promise.resolve(true);
    }
}