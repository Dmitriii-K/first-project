import { Module } from "@nestjs/common";
import { SessionController } from "./api/session.controller";
import { SessionsService } from "./application/session.service";
import { SessionsQueryRepository } from "./repository/session.query-repository";
import { SessionRepository } from "./repository/session.repository";
import { MongooseModule } from "@nestjs/mongoose";
import { Session, SessionSchema } from "./domain/session.entity";

@Module({
    imports: [MongooseModule.forFeature([{ name: Session.name, schema: SessionSchema }])],
    controllers: [SessionController],
    providers: [SessionsService, SessionRepository, SessionsQueryRepository],
    exports: [SessionsService] // в auth нужна SessionModelType
})
export class SessionsModule {
}