import { AuthRepository } from "../../repository/auth.repository";
import { CommandHandler } from "@nestjs/cqrs";
import { NewPasswordRecoveryInputModel } from "../../api/models/input.model";
import { BcryptService } from "src/infrastructure/adapters/bcrypt";
import { UserDocument } from "src/features/users/domain/user.entity";

export class NewPasswordCommand {
    constructor(public body: NewPasswordRecoveryInputModel) {}
}

@CommandHandler(NewPasswordCommand)
export class NewPasswordUseCase {
    constructor(
        private authRepository: AuthRepository,
        private bcryptService: BcryptService
    ) {}

    async execute(command: NewPasswordRecoveryInputModel): Promise<boolean> {
        // Проверяем, существует ли пользователь с таким кодом восстановления
        const user: UserDocument | null = await this.authRepository.findUserByCode(command.recoveryCode);
        if (!user) return false; // Пользователь не найден или код недействителен
        if (user.emailConfirmation.confirmationCode !== command.recoveryCode) return false;
        // Хешируем новый пароль
        const password = await this.bcryptService.createHashPassword(command.newPassword);
        // Обновляем пароль пользователя
        const result = await this.authRepository.updatePassword(user._id.toString(), password);
        if (result) {
            return true;
        } else {
            return false;
        }
    }
}