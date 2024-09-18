import { Injectable } from "@nestjs/common";
import { AuthRepository } from "../../repository/auth.repository";
import { CommandHandler } from "@nestjs/cqrs";
import { JwtService } from "src/infrastructure/adapters/jwt.service";
import { Session } from "src/features/sessions/domain/session.entity";

// export class CreateSessionCommand {
//     constructor() {}
// }

// @CommandHandler()
Injectable()
export class CreateSessionUseCase {
    constructor(
        private authRepository: AuthRepository,
        private jwtService: JwtService
    ) {}

    async execute(userId: string, token: string, userAgent: string, ip: string) {
        const payload = this.jwtService.getUserIdByToken(token);
        let { iat, exp, deviceId } = payload!;
        iat = new Date(iat * 1000).toISOString();// вынести в createSession
        exp = new Date(exp * 1000).toISOString();// вынести в createSession

        const newSession: Session = Session.createSession(userId, deviceId, iat, exp, userAgent, ip);
        await this.authRepository.createSession(newSession);
    }
}