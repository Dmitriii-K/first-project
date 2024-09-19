import { Injectable } from "@nestjs/common";
import { AuthRepository } from "../../repository/auth.repository";
import { CommandHandler } from "@nestjs/cqrs";
import { JwtService } from "src/infrastructure/adapters/jwt.service";
import { MeViewModel } from "../../api/models/output.model";

export class UpdateRefreshTokenCommand {
    constructor(
        public user: MeViewModel, 
        public deviceId: string
    ) {}
}

@CommandHandler(UpdateRefreshTokenCommand)
export class UpdateRefreshTokenUseCase {
    constructor(
        private authRepository: AuthRepository,
        private jwtService: JwtService
    ) {}

    async execute(command: UpdateRefreshTokenCommand) {
        const {user, deviceId} = command
        
        const newPairTokens = this.jwtService.generateToken(user, deviceId);
        const { accessToken, refreshToken } = newPairTokens;
        const payload = this.jwtService.getUserIdByToken(refreshToken);
        if (!payload) throw new Error('пейлода нет, хотя он должен быть после создания новой пары');
        let { iat } = payload;
        iat = new Date(iat * 1000).toISOString();
        await this.authRepository.updateIat(iat, deviceId);
        return { accessToken, refreshToken };
    }
}