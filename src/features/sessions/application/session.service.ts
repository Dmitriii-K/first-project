import { Injectable } from "@nestjs/common";

@Injectable()
export class SessionService {
    constructor() {}

    // async deleteAllSessionsExceptCurrentOne(userId: string, device_id: string) {
    //     const result = await this.sessionsRepository.deleteAllSessionsExceptCurrentOne(userId, device_id);
    //     return result;
    // }
    // async deleteSessionById(deviceId: string) {
    //     const result = await this.sessionsRepository.deleteSessionById(deviceId);
    //     return result;
    // }
    // async findUserByDeviceId(deviceId: string) {
    //     const result = await this.sessionsRepository.findUserByDeviceId(deviceId);
    //     return result
    // }
}