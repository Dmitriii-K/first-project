import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Session, SessionModelType } from "../domain/session.entity";

@Injectable()
export class SessionQueryRepository /*implements ICommentQueryRepository*/{
    constructor(@InjectModel(Session.name) private sessionModel: SessionModelType) {}

    // async findSessions(userId: string): Promise<DeviceViewModel[] | null> {
    //     if (!userId) {
    //         throw new Error("User ID is required");
    //     }
    //     const currentTime = new Date().toISOString();
    //     const sessions = await SessionModel.find({ user_id: userId, exp: { $gte: currentTime } }).exec();
    //     return sessions.map(this.mapSession);
    // }
    // mapSession(session: WithId<SessionsType>): DeviceViewModel {
    //     return {
    //         ip: session.ip,
    //         title: session.device_name,
    //         lastActiveDate: session.iat,
    //         deviceId: session.device_id
    //     };
    // }
}