import { Injectable } from "@nestjs/common";
import { UserInputModel } from "src/features/users/api/models/input.models";
import { User } from "src/features/users/domain/user.entity";
import { AuthRepository } from "../../repository/auth.repository";
import { BcryptService } from "src/infrastructure/adapters/bcrypt";
import { EmailService } from "src/infrastructure/adapters/sendEmail";
import { CommandHandler } from "@nestjs/cqrs";

export class RegisterUserCommand {
    constructor(public body: UserInputModel) {}
}

@CommandHandler(RegisterUserCommand)
export class RegisterUserUseCase {
    constructor(
        private authRepository: AuthRepository,
        private bcryptService: BcryptService,
        private emailService: EmailService
    ) {}

    async execute(command: RegisterUserCommand) {
        const checkUser = await this.authRepository.checkUserByRegistration(command.body.login, command.body.email);
        if (checkUser !== null) return;
        const password = await this.bcryptService.createHashPassword(command.body.password);
        const newUserForRegistration: User = User.createUserForRegistration(command.body.login, password, command.body.email);
        await this.authRepository.createUser(newUserForRegistration); // сохранить юзера в базе данных
        this.emailService.sendMail(newUserForRegistration.email, newUserForRegistration.emailConfirmation.confirmationCode);
        return newUserForRegistration;
    }
}