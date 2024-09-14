import { Injectable } from "@nestjs/common";
import { UserInputModel } from "src/features/users/api/models/input.models";
import { User } from "src/features/users/domain/user.entity";
import { AuthRepository } from "../../repository/auth.repository";
import { BcryptService } from "src/infrastructure/adapters/bcrypt";
import { EmailService } from "src/infrastructure/adapters/sendEmail";


@Injectable()
export class RegisterUserUseCase {
    constructor(
        private authRepository: AuthRepository,
        private bcryptService: BcryptService,
        private emailService: EmailService
    ) {}

    async execute(body: UserInputModel) {
        const checkUser = await this.authRepository.checkUserByRegistration(body.login, body.email);
        if (checkUser !== null) return;
        const password = await this.createHashPassword(body.password);
        const newUserForRegistration: User = User.createUserForRegistration(body.login, password, body.email);
        await this.authRepository.createUser(newUserForRegistration); // сохранить юзера в базе данных
        this.emailService.sendMail(newUserForRegistration.email, newUserForRegistration.emailConfirmation.confirmationCode);
        return newUserForRegistration;
    }
    private createHashPassword(body: UserInputModel) {
        this.bcryptService.createHashPassword(body.password);
    }
    private sendEmail() {

    }
    private controlAuthRepository() {
        
    }
}