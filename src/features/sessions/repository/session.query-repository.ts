import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Session, SessionModelType } from "../domain/session.entity";

@Injectable()
export class SessionQueryRepository /*implements ICommentQueryRepository*/{
    constructor(@InjectModel(Session.name) private sessionModel: SessionModelType) {}


}