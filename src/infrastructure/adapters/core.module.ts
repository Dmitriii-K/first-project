import { Global, Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { EmailService } from "./sendEmail";
import { JwtService } from "./jwt.service";
import { BcryptService } from "./bcrypt";
import { ThrottlerModule } from "@nestjs/throttler";
import { LocalStrategy } from "../pasport-strategy/local.strategy";
import { JwtStrategy } from "../pasport-strategy/jwt.strategy";
import { BasicStrategy } from "../pasport-strategy/basic.strategy";
import { SoftAuthGuard } from "../guards/dubl-guards/soft-auth.guard";
import { CheckTokenAuthGuard } from "../guards/dubl-guards/check-refresh-token.guard";
import { UsersModule } from "src/features/users/users.module";
import { SessionsModule } from "src/features/sessions/sessions.module";
import { forwardRef } from '@nestjs/common';

@Global()
@Module({
    imports: [
        CqrsModule, SessionsModule,
        forwardRef(() =>UsersModule),
        ThrottlerModule.forRoot([{
            ttl: 10000,
            limit: 5,
        }]),
    ],
    controllers: [],
    providers: [BcryptService, JwtService, EmailService, LocalStrategy, JwtStrategy, BasicStrategy, SoftAuthGuard, CheckTokenAuthGuard],
    exports: [BcryptService, JwtService, EmailService, LocalStrategy, JwtStrategy, BasicStrategy, SoftAuthGuard, CheckTokenAuthGuard]
})
export class CoreModule {
}