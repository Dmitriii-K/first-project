import { Body, Controller, Get, HttpCode, Post, Req, Res, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "../application/auth.service";
import { AuthRepository } from "../repository/auth.repository";
import { BcryptService } from "src/infrastructure/adapters/bcrypt";
import { JwtService } from "src/infrastructure/adapters/jwt.service";
import { LoginInputModel, NewPasswordRecoveryInputModel, RegistrationConfirmationCodeModel, RegistrationEmailResending } from "./models/input.model";
import { UserInputModel } from "src/features/users/api/models/input.models";

@Controller('auth')
export class AuthController{
    constructor(
        protected authService: AuthService,
        protected authRepository: AuthRepository,
        protected bcryptService: BcryptService,
        protected jwtService: JwtService
    ) {}

    @Post('login')
    @HttpCode(200)
    async authLoginUser(
        @Body() body: LoginInputModel,
        @Res({ passthrough: true }) res: Response,
        @Req() req: Request,) {
            const authUser = await this.authService.checkCredentials(body.loginOrEmail);
            if (!authUser) {
                throw new UnauthorizedException('User is not found')
            }
                const isCorrect = await this.bcryptService.comparePasswords(body.password, authUser.password);
                if (isCorrect) {
                    const { accessToken, refreshToken } = this.jwtService.generateToken(authUser);
                    await this.authService.createSession(
                        authUser.id,
                        refreshToken,
                        req.headers["user-agent"] || "unknown",
                        req.ip || "unknown");

                res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true });
                return { accessToken };
                } else {
                    throw new UnauthorizedException('Password or login is wrong')
            }
    }

    @Post('password-recovery')
    @HttpCode(204)
    async authPasswordRecovery(@Body() body: RegistrationEmailResending) {
        await this.authService.passwordRecovery(body.email);
    }

    @Post('new-password')
    @HttpCode(204)
    async authNewPassword(@Body() body: NewPasswordRecoveryInputModel) {
        const newPassword = await this.authService.newPassword(body);
        return newPassword;
    }

    // @Post()
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

    @Post('registration')
    @HttpCode(204)
    async authRegistration(@Body() body: UserInputModel) {
        const registrationResult = await this.authService.registerUser(body);
        return registrationResult;
    }

    @Post('registration-confirmation')
    @HttpCode(204)
    async authRegistrationConfirmation(@Body() body: RegistrationConfirmationCodeModel) {
        const result = await this.authService.confirmEmail(body.code);
        return result;
    }

    @Post('registration-email-resending')
    @HttpCode(204)
    async authRegistrationEmailResending(@Body() body: RegistrationEmailResending) {
        const emailResending = await this.authService.resendEmail(body.email);
        return emailResending;
    }

    // @Post()
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

    @Get('me')
    async getUserInform(@Req() req: Request) {
        const { login, email, _id } = req.user;
        const result = { login, email, userId: _id.toString() };
        return result;
    }
}