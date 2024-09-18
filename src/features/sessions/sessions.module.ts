import { Module } from "@nestjs/common";
import { SessionController } from "./api/session.controller";
import { SessionsService } from "./application/session.service";
import { SessionsQueryRepository } from "./repository/session.query-repository";
import { SessionRepository } from "./repository/session.repository";
import { MongooseModule } from "@nestjs/mongoose";
import { Session, SessionSchema } from "./domain/session.entity";
import { AuthModule } from "../auth/auth.module";
import { UsersModule } from "../users/users.module";

@Module({
    imports: [MongooseModule.forFeature([{ name: Session.name, schema: SessionSchema }]), AuthModule, UsersModule],
    controllers: [SessionController],
    providers: [SessionsService, SessionRepository, SessionsQueryRepository],
    exports: [SessionsService, SessionRepository, SessionsQueryRepository]
})
export class SessionsModule {}