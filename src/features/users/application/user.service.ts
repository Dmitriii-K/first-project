import { Injectable } from "@nestjs/common";
import { UserInputModel } from "../api/models/input.models";
import { IBcryptService, IUserRepository, IUserService } from "../api/models/interface";
import { UserDocument } from "../domain/user.entity";
import { BcryptService } from "src/infrastructure/adapters/bcrypt";
import { UserRepository } from "../repository/user.repository";


@Injectable()
export class UserService /*implements IUserService*/{
    constructor(
        protected userRepository: UserRepository,
        protected bcryptService: BcryptService) {}

    async createUser(data: UserInputModel) {
        const userExist = await this.userRepository.findUserByLogiOrEmail({ login: data.login, email: data.email });
        if (userExist) {
            return false;
        }
        const userPassword = await this.bcryptService.createHashPassword(data.password);

        const createDate = new Date();
        const newUser: UserDocument = {
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