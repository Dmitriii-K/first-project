import { BadRequestException } from "@nestjs/common";
import { AuthRepository } from "../../repository/auth.repository";
import { CommandHandler } from "@nestjs/cqrs";
import { UserDocument } from "src/features/users/domain/user.entity";
import { randomUUID } from "crypto";
import { EmailService } from "src/infrastructure/adapters/sendEmail";

export class ResendEmailCommand {
    constructor(public mail: string) {}
}

@CommandHandler(ResendEmailCommand)
export class ResendEmailUseCase {
    constructor(
        private authRepository: AuthRepository,
        private emailService: EmailService
    ) {}

    async execute(commannd: ResendEmailCommand) {
        const {mail} = commannd;
        
        const user: UserDocument | null = await this.authRepository.findUserByEmail(mail);
        if (!user) {
            throw new BadRequestException({ errorsMessages: { message: "This email is incorrect", field: "email" } });
        }
        if (user.emailConfirmation.isConfirmed) {
            throw new BadRequestException({ errorsMessages: { message: "This field is verified", field: "email" } });
        }
        const newCode = randomUUID();
        await this.authRepository.updateCode(user.id, newCode),
        this.emailService.sendMail(mail, newCode)
        return true;
    }
}