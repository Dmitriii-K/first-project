import { Module } from "@nestjs/common";
import { AuthController } from "./api/auth.controller";
import { AuthService } from "./application/auth.service";
import { AuthRepository } from "./repository/auth.repository";
import { BcryptService } from "src/infrastructure/adapters/bcrypt";
import { EmailService } from "src/infrastructure/adapters/sendEmail";
import { JwtService } from "src/infrastructure/adapters/jwt.service";
import { MongooseModule } from "@nestjs/mongoose";
import { ApiInfo, ApiSchema } from "./domain/auth.entity";
import { Session, SessionSchema } from "../sessions/domain/session.entity";
import { User, UserSchema } from "../users/domain/user.entity";
import { CommandBus } from "@nestjs/cqrs";


@Module({
    imports: [
        MongooseModule.forFeature([
        { name: ApiInfo.name, schema: ApiSchema }, 
        { name: Session.name, schema: SessionSchema },
        { name: User.name, schema: UserSchema }])
    ],
    controllers: [AuthController],
    providers: [
    AuthService, 
    AuthRepository,
    BcryptService, EmailService, JwtService, CommandBus],
    exports: []
})
export class AuthModule {
}