import  jwt from 'jsonwebtoken';
import { SETTINGS } from '../../settings/app-settings';
import {  WithId } from 'mongodb';
import { randomUUID } from 'crypto';
import { Injectable } from '@nestjs/common';
import { User, UserDocument } from 'src/features/users/domain/user.entity';


export type PayloadType  = {
userId: string;
email: string,
login: string,
deviceId: string,
}

export type SystemPayload = {
iat: any
exp: any
}

export type UnionPayload = PayloadType & SystemPayload

@Injectable()
export class JwtService /*implements IJwtService*/ {
generateToken(user: UserDocument, deviceId?: string): { accessToken: string, refreshToken: string } {
    const payload: PayloadType = {
        userId: user.id,
        email: user.email,
        login: user.login,
        deviceId: deviceId ?? randomUUID()
    };
    const optionsAccessToken = {
        expiresIn: '6000s'
    };
    const optionsRefreshToken = {
        expiresIn: '8000s'
    };
    const secretKey = SETTINGS.JWT_SECRET_KEY;
    const accessToken: string = jwt.sign(payload, secretKey, optionsAccessToken);
    const refreshToken: string = jwt.sign(payload, secretKey, optionsRefreshToken);
    return { accessToken, refreshToken };
}

getUserIdByToken(token: string): UnionPayload | null {
    try {
        return jwt.verify(token, SETTINGS.JWT_SECRET_KEY) as unknown as UnionPayload;
    } catch (error) {
        // console.log(error, " error")
        return null;
    }
}
}