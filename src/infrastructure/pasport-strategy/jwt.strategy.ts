import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
// import { SETTINGS } from 'src/settings/app-settings';
import { UserDocument } from 'src/features/users/domain/user.entity';
import { RequestUserDTO } from 'src/features/auth/api/models/input.model';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private configService: ConfigService) {
    super({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        ignoreExpiration: false,
        secretOrKey: "123",
    });
}

    async validate(payload: any): Promise<RequestUserDTO | boolean> {
    // return { userId: payload.sub, username: payload.username };
    if(!payload.email || !payload.login || !payload.userId) {
        return false
    }
    return {email: payload.email, login: payload.login, userId: payload.userId};
    }
}