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
import { Session, SessionSchema } from "../sessions/domain/session.entity";
import { User, UserSchema } from "../users/domain/user.entity";
import { UserService } from "../users/application/user.service";
import { SessionRepository } from "../sessions/repository/session.repository";
import { CommandBus } from "@nestjs/cqrs";
import { UsersModule } from "../users/users.module";


@Module({
    imports: [
        MongooseModule.forFeature([
        { name: ApiInfo.name, schema: ApiSchema }, 
        { name: Session.name, schema: SessionSchema },
        { name: User.name, schema: UserSchema }]),
        UsersModule,
],
    controllers: [AuthController],
    providers: [
    AuthService, 
    AuthRepository,
    AuthQueryRepository,
    BcryptService, EmailService, JwtService, SessionRepository, CommandBus],// CommandBus ???
    exports: [MongooseModule, AuthService, AuthRepository, AuthQueryRepository, BcryptService, EmailService, JwtService, SessionRepository]
})
export class AuthModule {
}