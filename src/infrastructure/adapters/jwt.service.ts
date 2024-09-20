import  jwt from 'jsonwebtoken';
import { randomUUID } from 'crypto';
import { Injectable } from '@nestjs/common';
import { RequestUserDTO } from 'src/features/auth/api/models/input.model';
import { ConfigService } from '@nestjs/config';



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
    constructor(private configService: ConfigService) {}// Как подключить ?
    
generateToken(user: RequestUserDTO, deviceId?: string): { accessToken: string, refreshToken: string } {
    const payload: PayloadType = {
        userId: user.userId,
        email: user.email,
        login: user.login,
        deviceId: deviceId ?? randomUUID()
    };
    const optionsAccessToken = {// прописать в конфиг по необходимости
        expiresIn: '10s'
    };
    const optionsRefreshToken = {
        expiresIn: '20s'
    };
    const secretKey = this.configService.get<number>('jwtSecretSettings.JWT_SECRET_KEY', {infer: true});
    // console.log(secretKey)
    const accessToken: string = jwt.sign(payload, secretKey, optionsAccessToken);
    const refreshToken: string = jwt.sign(payload, secretKey, optionsRefreshToken);
    return { accessToken, refreshToken };
}

getUserIdByToken(token: string): UnionPayload | null {
    try {
        const secretKey = this.configService.get<number>('jwtSecretSettings.JWT_SECRET_KEY', {infer: true});// почему number ???
        return jwt.verify(token, secretKey) as unknown as UnionPayload;
    } catch (error) {
        // console.log(error, " error")
        return null;
    }
}
}

// @Injectable()
// export class JwtAdapter {
//   private readonly logger = new Logger(JwtAdapter.name);
//   private readonly jwtConfiguration: ConfigurationType['jwtSetting'];

//   constructor(
//     private readonly jwtService: JwtService,
//     private readonly configService: ConfigService<ConfigurationType, true>,
//   ) {
//     this.jwtConfiguration = this.configService.get<ConfigurationType['jwtSetting']>('jwtSetting', {
//       infer: true,
//     }) as ConfigurationType['jwtSetting'];
//   }