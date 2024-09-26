import { Module } from "@nestjs/common";
import { AuthController } from "./api/auth.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { ApiInfo, ApiSchema } from "./domain/auth.entity";
import { Session, SessionSchema } from "../sessions/domain/session.entity";
import { User, UserSchema } from "../users/domain/user.entity";
import { CqrsModule } from "@nestjs/cqrs";
import { UsersModule } from "../users/users.module";
import { SessionsModule } from "../sessions/sessions.module";
import { JwtService } from "src/infrastructure/adapters/jwt.service";
import { BcryptService } from "src/infrastructure/adapters/bcrypt";
import { EmailService } from "src/infrastructure/adapters/sendEmail";


@Module({
    imports: [CqrsModule, UsersModule, SessionsModule,
        MongooseModule.forFeature([
        { name: ApiInfo.name, schema: ApiSchema }, 
        { name: Session.name, schema: SessionSchema },
        { name: User.name, schema: UserSchema }])
    ],
    controllers: [AuthController],
    providers: [JwtService, BcryptService, EmailService],
    exports: []
})
export class AuthModule {
}