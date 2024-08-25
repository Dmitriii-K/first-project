import { Injectable } from "@nestjs/common";
import { UserInputModel } from "../api/models/input.models";
import { UserDBModel } from "src/base/types/user.types";
import { IBcryptService, IUserRepository, IUserService } from "../api/models/interface";


@Injectable()
export class UserService implements IUserService{
    constructor(
        protected userRepository: IUserRepository,
        protected bcryptService: IBcryptService) {}

    async createUser(data: UserInputModel) {
        const userExist = await this.userRepository.findUserByLogiOrEmail({ login: data.login, email: data.email });
        if (userExist) {
            return false;
        }
        const userPassword = await this.bcryptService.createHashPassword(data.password);

        const createDate = new Date().toISOString();
        const newUser: UserDBModel = {
            login: data.login,
            password: userPassword,
            email: data.email,
            createdAt: createDate,
            // emailConfirmation: {
            //     confirmationCode: "",
            //     expirationDate: "",
            //     isConfirmed: true
            // }
        };
        return this.userRepository.insertUser(newUser);
    }
    async deleteUser(id: string) {
        return this.userRepository.deleteUser(id);
    }
}