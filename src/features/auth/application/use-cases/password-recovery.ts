import { BadRequestException } from "@nestjs/common";
import { AuthRepository } from "../../repository/auth.repository";
import { CommandHandler } from "@nestjs/cqrs";
import { UserDocument } from "src/features/users/domain/user.entity";
import { randomUUID } from "crypto";
import { EmailService } from "src/infrastructure/adapters/sendEmail";

export class PasswordRecoveryCommand {
    constructor(public mail: string) {}
}

@CommandHandler(PasswordRecoveryCommand)
export class PasswordRecoveryUseCase {
    constructor(
        private authRepository: AuthRepository,
        private emailService: EmailService
    ) {}

    async execute(command: PasswordRecoveryCommand): Promise<boolean> {
        const {mail} = command;
        // Проверяем, существует ли пользователь с таким email
        const user: UserDocument | null = await this.authRepository.findUserByEmail(mail);
        if (!user) {
            throw new BadRequestException();
        } // Пользователь не найден
        // Генерируем код восстановления
        const recoveryCode = randomUUID();
        await this.authRepository.updateCode(user.id, recoveryCode);
        await this.emailService.sendPasswordRecoveryMail(mail, recoveryCode);
        return true;
    }
}