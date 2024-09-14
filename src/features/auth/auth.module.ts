import { Module } from "@nestjs/common";
import { AuthController } from "./api/auth.controller";
import { AuthService } from "./application/auth.service";
import { AuthRepository } from "./repository/auth.repository";
import { AuthQueryRepository } from "./repository/auth.query-repository";


@Module({
    imports: [],
    controllers: [AuthController],
    providers: [AuthService, AuthRepository, AuthQueryRepository],
    exports: []
})
export class AuthModule {
}