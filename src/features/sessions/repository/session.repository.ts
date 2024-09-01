import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Session, SessionModelType } from "../domain/session.entity";


@Injectable()
export class SessionRepository /*implements ICommentRepository*/{
    constructor(@InjectModel(Session.name) private sessionModel: SessionModelType) {}

    async deleteSessionById(deviceId: string) {
        const result = await this.sessionModel.deleteOne({ device_id: deviceId });
        return result.deletedCount === 1;
    }
    async deleteAllSessionsExceptCurrentOne(userId: string, device_id: string) {
        const deleteAllDevices = await this.sessionModel.deleteMany({ user_id: userId, device_id: { $ne: device_id } });
        return deleteAllDevices.deletedCount > 0;
    }
    async findSessionByMiddleware (deviceId: string) {
        const user = await this.sessionModel.findOne({device_id: deviceId});
        if(user) {
            return user
        } else {
            return null
        }
    }
    async findUserByDeviceId(deviceId: string) {
        const session = await this.sessionModel.findOne({ device_id: deviceId });
        return session || null
    }
}