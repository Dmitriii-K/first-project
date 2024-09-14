import { BadRequestException, Body, Controller, Get, HttpCode, HttpException, Post, Req, Res, UnauthorizedException, UseGuards } from "@nestjs/common";
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
import { SkipThrottle, Throttle, ThrottlerGuard } from "@nestjs/throttler";
import { BearerAuthGuard } from "src/infrastructure/guards/dubl-guards/bearer-auth.guard";
import { CheckTokenAuthGuard } from "src/infrastructure/guards/dubl-guards/check-refresh-token.guard";
import { RegisterUserUseCase } from "../application/use-cases/register-user";

@UseGuards(ThrottlerGuard)
@Controller('auth')
export class AuthController{
    constructor(
        protected authService: AuthService,
        protected authRepository: AuthRepository,
        protected bcryptService: BcryptService,
        protected jwtService: JwtService,
        protected registerUserUseCase: RegisterUserUseCase,
    ) {}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    @HttpCode(200)
    async authLoginUser(
        @Res({ passthrough: true }) res: Response,
        @Req() req: Request) {
            if(!req.user) throw new UnauthorizedException()
            const { accessToken, refreshToken } = this.jwtService.generateToken(req.user);
            await this.authService.createSession(
                req.user!.userId,
                refreshToken,
                req.headers["user-agent"] || "unknown",
                req.ip || "unknown");

        res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true });
        return { accessToken };
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
            throw new BadRequestException();
        }
        return newPassword;
    }

    @UseGuards(CheckTokenAuthGuard)
    @Post('refresh-token')
    async authRefreshToken(
        @Res() res: Response,
        @Req() req: Request) {
            if(!req.user) throw new UnauthorizedException()
            if(!req.deviceId) throw new UnauthorizedException()
            const device = await this.authRepository.findSessionFromDeviceId(req.deviceId);
            if (!device) {
                throw new UnauthorizedException();
            }
            const result = await this.authService.updateRefreshToken(req.user, req.deviceId);

            const { accessToken, refreshToken } = result;
            res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true })
                .status(200).json({ accessToken });
        }

    @Post('registration')
    @HttpCode(204)
    async authRegistration(@Body() body: UserInputModel) {
        const registrationResult = await this.authService.registerUser(body);
        // const registrationResult = await this.registerUserUseCase.execute(body);
        if(!registrationResult) {
            throw new BadRequestException();
        }
        return registrationResult;
    }

    @Post('registration-confirmation')
    @HttpCode(204)
    async authRegistrationConfirmation(@Body() body: RegistrationConfirmationCodeModel) {
        const result = await this.authService.confirmEmail(body.code);
        if(!result) {
            throw new BadRequestException();
        }
        return result;
    }

    @Post('registration-email-resending')
    @HttpCode(204)
    async authRegistrationEmailResending(@Body() body: RegistrationEmailResending) {
        const emailResending = await this.authService.resendEmail(body.email);
        if(!emailResending) {
            throw new BadRequestException();
        }
        return emailResending;
    }

    @UseGuards(CheckTokenAuthGuard)
    @Post('logout')
    @HttpCode(204)
    async authLogout(
        @Res() res: Response,
        @Req() req: Request) {
            if(!req.deviceId) throw new UnauthorizedException();
            const device = await this.authRepository.findSessionFromDeviceId(req.deviceId);
            if (!device) {
                throw new UnauthorizedException();
            }
            const result = await this.authService.authLogoutAndDeleteSession(req.deviceId);
            if (result) {
                res.clearCookie('refreshToken');
                res.sendStatus(204);
            }
    }

    @SkipThrottle()
    @UseGuards(JwtAuthGuard)
    @Get('me')
    async getUserInform(
        @Res({ passthrough: true }) response: Response,
        @Req() request: Request) {
            if(!request.user) throw new UnauthorizedException()
        const {login, email, userId} = request.user // as { login: string, email: string, userId: string }

        const result: MeViewModel = { login, email, userId };
        return result;
    }
}