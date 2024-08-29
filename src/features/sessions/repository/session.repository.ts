import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Session, SessionModelType } from "../domain/session.entity";


@Injectable()
export class SessionRepository /*implements ICommentRepository*/{
    constructor(@InjectModel(Session.name) private sessionModel: SessionModelType) {}


}