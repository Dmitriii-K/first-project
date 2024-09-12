import { BadRequestException, Injectable } from "@nestjs/common";
import { AuthRepository } from "../repository/auth.repository";
import { BcryptService } from "src/infrastructure/adapters/bcrypt";
import { JwtService } from "src/infrastructure/adapters/jwt.service";
import { EmailService } from "src/infrastructure/adapters/sendEmail";
import { Session } from "src/features/sessions/domain/session.entity";
import { User, UserDocument } from "src/features/users/domain/user.entity";
import { randomUUID } from "crypto";
import { NewPasswordRecoveryInputModel } from "../api/models/input.model";
import { UserInputModel } from "src/features/users/api/models/input.models";
import {WithId} from "mongodb"
import { MeViewModel } from "../api/models/output.model";

@Injectable()
export class AuthService{
    constructor(
        protected authRepository: AuthRepository,
        protected bcryptService: BcryptService,
        protected jwtService: JwtService,
        protected emailService: EmailService
    ) {}

    async checkCredentials(loginOrEmail: string) {
        const user = await this.authRepository.findUserByLoginOrEmail(loginOrEmail);
        if (user) {
            return user;
        } else {
            return null;
        }
    }
    async registerUser(data: UserInputModel) {
        const checkUser = await this.authRepository.checkUserByRegistration(data.login, data.email);
        if (checkUser !== null) return;
        const password = await this.bcryptService.createHashPassword(data.password); //создать хэш пароля
        // const newUser: UserDBModel = { // сформировать dto юзера
        //     login: data.login,
        //     email: data.email,
        //     password,
        //     createdAt: new Date().toString(),
        //     emailConfirmation: { // доп поля необходимые для подтверждения
        //         confirmationCode: randomUUID(),
        //         expirationDate: (add(new Date(), { hours: 1, minutes: 30, })).toISOString(),
        //         isConfirmed: false
        //     }
        // };
        const newUserForRegistration: User = User.createUserForRegistration(data.login, password, data.email);
        await this.authRepository.createUser(newUserForRegistration); // сохранить юзера в базе данных
        this.emailService.sendMail(newUserForRegistration.email, newUserForRegistration.emailConfirmation.confirmationCode);
        return newUserForRegistration;
    }
    async updateRefreshToken(user: MeViewModel, deviceId: string) {
        const newPairTokens = this.jwtService.generateToken(user, deviceId);
        const { accessToken, refreshToken } = newPairTokens;
        const payload = this.jwtService.getUserIdByToken(refreshToken);
        if (!payload) throw new Error('пейлода нет, хотя он должен быть после создания новой пары');
        let { iat } = payload;
        iat = new Date(iat * 1000).toISOString();
        await this.authRepository.updateIat(iat, deviceId);
        return { accessToken, refreshToken };
    }
    async createSession(userId: string, token: string, userAgent: string, ip: string) {
        const payload = this.jwtService.getUserIdByToken(token);
        let { iat, exp, deviceId } = payload!;
        iat = new Date(iat * 1000).toISOString();
        exp = new Date(exp * 1000).toISOString();
        // const newSession: Session = {
        //     user_id: userId,
        //     device_id: deviceId,
        //     iat: iat,
        //     exp: exp,
        //     device_name: userAgent,
        //     ip: ip
        // };
        const newSession: Session = Session.createSession(userId, deviceId, iat, exp, userAgent, ip);
        await this.authRepository.createSession(newSession);
    }
    async authLogoutAndDeleteSession(deviceId: string) {
        const deletedSession = await this.authRepository.deleteSession(deviceId);
        if (deletedSession) {
            return true;
        } else {
            return false;
        }
    }
    async newPassword(data: NewPasswordRecoveryInputModel): Promise<boolean> {
        // Проверяем, существует ли пользователь с таким кодом восстановления
        const user: UserDocument | null = await this.authRepository.findUserByCode(data.recoveryCode);
        if (!user) return false; // Пользователь не найден или код недействителен
        if (user.emailConfirmation.confirmationCode !== data.recoveryCode) return false;
        // Хешируем новый пароль
        const password = await this.bcryptService.createHashPassword(data.newPassword);
        // Обновляем пароль пользователя
        const result = await this.authRepository.updatePassword(user._id.toString(), password);
        if (result) {
            return true;
        } else {
            return false;
        }
    }
    async passwordRecovery(mail: string): Promise<boolean> {
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
    async confirmEmail(code: string) {
        const user: UserDocument | null = await this.authRepository.findUserByCode(code);
        if (!user) {
            throw new BadRequestException({ errorsMessages: { message: "This code is incorrect", field: "code" } });
        }
        if (user.emailConfirmation.isConfirmed) {
            throw new BadRequestException({ errorsMessages: { message: "This field is verified", field: "code" } });
        }
        if (user.emailConfirmation.confirmationCode !== code) {
            throw new BadRequestException({ errorsMessages: { message: "This code is incorrect", field: "code" } });
        }
        if (user.emailConfirmation.expirationDate < new Date().toISOString()) {
            throw new BadRequestException({ errorsMessages: { message: "Expiration date is over", field: "code" } });
        }
        const result = await this.authRepository.updateConfirmation(user.id);
        return result;
    }
    async resendEmail(mail: string) {
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
    async validateUser(login: string, pass: string): Promise<WithId<User> | null> {
        return this.authRepository.findOne(login);
    }
}