import { Controller } from "@nestjs/common";
import { AuthService } from "../application/auth.service";
import { AuthRepository } from "../repository/auth.repository";
import { BcryptService } from "src/infrastructure/adapters/bcrypt";
import { JwtService } from "src/infrastructure/adapters/jwt.service";

@Controller()
export class AuthController{
    constructor(
        protected authService: AuthService,
        protected authRepository: AuthRepository,
        protected bcryptService: BcryptService,
        protected jwtService: JwtService
    ) {}

    // async authLoginUser() {
    //         const authUser = await this.authService.checkCredentials(req.body.loginOrEmail);
    //         if (!authUser) {
    //             res.status(401).json({ errorsMessages: [{ field: 'user', message: 'user not found' }] });
    //             return;
    //         } else {
    //             const isCorrect = await this.bcryptService.comparePasswords(req.body.password, authUser?.password);
    //             if (isCorrect) {
    //                 const { accessToken, refreshToken } = this.jwtService.generateToken(authUser);
    //                 await this.authService.createSession(authUser._id.toString(), refreshToken, req.headers["user-agent"] || "unknown", req.ip || "unknown");
    //                 res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true })
    //                     .status(200).json({ accessToken });
    //                 return;
    //             } else {
    //                 res.status(401).json({ errorsMessages: [{ field: 'password and login', message: 'password or login is wrong' }] });
    //                 return;
    //             }
    //         }
    // }
    // async authPasswordRecovery() {
    //         await this.authService.passwordRecovery(req.body.email);
    //         res.sendStatus(204);
    // }
    // async authNewPassword() {
    //         const newPassword = await this.authService.newPassword(req.body);
    //         if (newPassword) {
    //             res.sendStatus(204);
    //         } else {
    //             res.status(400).json({ errorsMessages: [{ message: "Code validation failure", field: "recoveryCode" }] });
    //         }

    // }
    // async authRefreshToken() {
    //         const device = await this.authRepository.findSessionFromDeviceId(req.deviceId);
    //         if (!device) {
    //             res.sendStatus(401);
    //             return;
    //         }
    //         const result = await this.authService.updateRefreshToken(req.user, req.deviceId);

    //         const { accessToken, refreshToken } = result;
    //         res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true })
    //             .status(200).json({ accessToken });
    // }
    // async authRegistration() {
    //         const registrationResult = await this.authService.registerUser(req.body);
    //         if (registrationResult) {
    //             res.sendStatus(204);
    //         } else {
    //             res.sendStatus(400);
    //             return;
    //         }
    // }
    // async authRegistrationConfirmation() {
    //         const result = await this.authService.confirmEmail(req.body.code);
    //         if (result) {
    //             res.sendStatus(204);
    //         } else {
    //             res.status(400).send({ errorsMessages: [{ field: "code", message: " Code validation failure " }] })
    //             return;
    //         }
    // }
    // async authRegistrationEmailResending() {
    //         const emailResending = await this.authService.resendEmail(req.body.email);
    //         if (emailResending) {
    //             res.sendStatus(204);
    //         } else {
    //             res.status(400).json({ errorsMessages: [{ message: 'other error', field: 'email', }] });
    //         }
    // }
    // async authLogout() {
    //         const device = await this.authRepository.findSessionFromDeviceId(req.deviceId);
    //         if (!device) {
    //             res.sendStatus(401);
    //             return;
    //         }
    //         const result = await this.authService.authLogoutAndDeleteSession(req.deviceId);
    //         if (result) {
    //             res.clearCookie('refreshToken');
    //             res.sendStatus(204);
    //         }
    // }
    // async getUserInform() {
    //         const { login, email, _id } = req.user;
    //         const result = { login, email, userId: _id.toString() };
    //         res.status(200).json(result!);
    //         return;
    // }
}