import { BadRequestException, Body, Controller, Get, HttpCode, Post, Req, Res, UnauthorizedException, UseGuards } from "@nestjs/common";
import { AuthService } from "../application/auth.service";
import { AuthRepository } from "../repository/auth.repository";
import { BcryptService } from "src/infrastructure/adapters/bcrypt";
import { JwtService } from "src/infrastructure/adapters/jwt.service";
import { LoginInputModel, NewPasswordRecoveryInputModel, RegistrationConfirmationCodeModel, RegistrationEmailResending } from "./models/input.model";
import { UserInputModel } from "src/features/users/api/models/input.models";
import { Request, Response } from "express";
import { MeViewModel } from "./models/output.model";
import { LocalAuthGuard } from "src/infrastructure/guards/local-auth.guard";
import { JwtAuthGuard } from "src/infrastructure/guards/jwt-auth.guard";

@Controller('auth')
export class AuthController{
    constructor(
        protected authService: AuthService,
        protected authRepository: AuthRepository,
        protected bcryptService: BcryptService,
        protected jwtService: JwtService
    ) {}

    // @UseGuards(LocalAuthGuard)
    @Post('login')
    @HttpCode(200)
    async authLoginUser(
        @Body() body: LoginInputModel,
        @Res({ passthrough: true }) res: Response,
        @Req() req: Request,) {
            console.log(body.loginOrEmail)
            const authUser = await this.authService.checkCredentials(body.loginOrEmail); // проверка реализоана в Local Strategy
            if (!authUser) {
                throw new UnauthorizedException('User is not found')
                // res.status(401).json({ errorsMessages: [{ field: 'user', message: 'user not found' }] });
                // return;
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
            // res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true })
            //     .status(200).json({ accessToken });
            //     return;
            // } else {
            //     res.status(401).json({ errorsMessages: [{ field: 'password and login', message: 'password or login is wrong' }] });
            //     return;
            //     }
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
        if(!newPassword) {
            throw new BadRequestException('This is a bad request error is recovery code');
        }
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
        if(!registrationResult) {
            throw new BadRequestException('This is a bad request error is registration');
        }
        return registrationResult;
    }

    @Post('registration-confirmation')
    @HttpCode(204)
    async authRegistrationConfirmation(@Body() body: RegistrationConfirmationCodeModel) {
        const result = await this.authService.confirmEmail(body.code);
        if(!result) {
            throw new BadRequestException('Error is Code validation failure');
        }
        return result;
    }

    @Post('registration-email-resending')
    @HttpCode(204)
    async authRegistrationEmailResending(@Body() body: RegistrationEmailResending) {
        const emailResending = await this.authService.resendEmail(body.email);
        if(!emailResending) {
            throw new BadRequestException('This is a bad request error is email');
        }
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

    @UseGuards(JwtAuthGuard)
    @Get('me')
    async getUserInform(
        @Res({ passthrough: true }) response: Response,
        @Req() request: Request) {
            if(!request.user) throw new UnauthorizedException()
        const { login, email, userId } = request.userGlobal;
        const result: MeViewModel = { login, email, userId };
        return result;
    }
}