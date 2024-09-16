import { Module } from "@nestjs/common";
import { AuthController } from "./api/auth.controller";
import { AuthService } from "./application/auth.service";
import { AuthRepository } from "./repository/auth.repository";
import { AuthQueryRepository } from "./repository/auth.query-repository";
import { BcryptService } from "src/infrastructure/adapters/bcrypt";
import { EmailService } from "src/infrastructure/adapters/sendEmail";
import { JwtService } from "src/infrastructure/adapters/jwt.service";
import { MongooseModule } from "@nestjs/mongoose";
import { ApiInfo, ApiSchema } from "./domain/auth.entity";


@Module({
    imports: [
        MongooseModule.forFeature([{ name: ApiInfo.name, schema: ApiSchema }]),
        BcryptService,
        EmailService,
        JwtService], // SessionModelType, UserModelType ???
    controllers: [AuthController],
    providers: [AuthService, AuthRepository, AuthQueryRepository],
    exports: []
})
export class AuthModule {
}