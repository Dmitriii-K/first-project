import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { ApiInfo, ApiInfoModelType } from "../domain/auth.entity";
import { User, UserDocument, UserModelType } from "src/features/users/domain/user.entity";
import { Session, SessionModelType } from "src/features/sessions/domain/session.entity";


@Injectable()
export class AuthRepository{
    constructor(
        @InjectModel(ApiInfo.name) private apiModel: ApiInfoModelType,
        @InjectModel(Session.name) private sessionModel: SessionModelType,
        @InjectModel(User.name) private userModel: UserModelType,
    ) {}

    async updateCode(userId: string, newCode: string) {
        const result = await this.userModel.updateOne({ _id: userId }, { $set: { 'emailConfirmation.confirmationCode': newCode } });
        return result.modifiedCount === 1;
    }
    async updatePassword(userId: string, pass: string) {
        const result = await this.userModel.updateOne({ _id: userId }, { $set: { password: pass } });
        return result.modifiedCount === 1;
    }
    async checkUserByRegistration(login: string, email: string): Promise<UserDocument | null> {
        return this.userModel.findOne({ $or: [{ login: login }, { email: email }] });
    }
    async findUserByLoginOrEmail(loginOrEmail: string): Promise<UserDocument | null> {
        return this.userModel.findOne({ $or: [{ login: loginOrEmail }, { email: loginOrEmail }] });
    }
    async createUser(user: User) {
        const saveResult = await this.userModel.create(user);
        return saveResult._id.toString();
    }
    async findUserByCode(code: string): Promise<UserDocument | null> {
        return this.userModel.findOne({ "emailConfirmation.confirmationCode": code });
    }
    async findUserByEmail(mail: string): Promise<UserDocument | null> {
        return this.userModel.findOne({ email: mail });
    }
    async findOne(login: string): Promise<any | null> {
        return this.userModel.findOne({ login: login });
    }
    async updateConfirmation(_id: string) {
        const result = await this.userModel.updateOne({ _id }, { $set: { 'emailConfirmation.isConfirmed': true } });
        return result.modifiedCount === 1;
    }
    async createSession(session: Session) {
        const saveResult = await this.sessionModel.create(session);
        return saveResult._id.toString();
    }
    // async findSessionFromDeviceId(deviceId: string) {
    //     return SessionModel.findOne({ device_id: deviceId });
    // }
    // async updateIat(iat: string, deviceId: string) {
    //     await SessionModel.updateOne({ device_id: deviceId }, { $set: { iat: iat } });
    // }
    // async deleteSession(deviceId: string) {
    //     const result = await SessionModel.deleteOne({ device_id: deviceId });
    //     if (result.deletedCount === 1) {
    //         return true;
    //     } else {
    //         return false;
    //     }
    // }
    // async resendMail (mail: string) {
    //     return UserModel.findOne({email: mail});
    // }
    // async dataRecording(ip: string, url: string, currentDate: Date) {
    //     const result = await ApiModel.create({ ip: ip, URL: url, date: currentDate });
    //     return result._id.toString();
    // }
    // async countingNumberRequests(ip: string, url: string, tenSecondsAgo: Date) {
    //     const filterDocument = {
    //         ip: ip,
    //         URL: url,
    //         date: { $gte: tenSecondsAgo }
    //     };
    //     return ApiModel.countDocuments(filterDocument);
    // }
}