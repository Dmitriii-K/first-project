import { Module } from "@nestjs/common";
import { SessionController } from "./api/session.controller";
import { SessionsService } from "./application/session.service";
import { SessionsQueryRepository } from "./repository/session.query-repository";
import { SessionRepository } from "./repository/session.repository";

@Module({
    imports: [],
    controllers: [SessionController],
    providers: [SessionsService, SessionRepository, SessionsQueryRepository],
})
export class SessionsModule {
}