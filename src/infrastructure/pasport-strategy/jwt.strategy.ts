import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { SETTINGS } from 'src/settings/app-settings';
import { UserFromAuth } from './local.strategy';
import { UserDocument } from 'src/features/users/domain/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
    super({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        ignoreExpiration: false,
        secretOrKey: SETTINGS.JWT_SECRET_KEY,
    });
}

    async validate(payload: any):Promise<UserFromAuth | boolean> {
    // return { userId: payload.sub, username: payload.username };
    if(!payload.email || !payload.login || !payload.sub) {
        return false
    }
    return { user:{email: payload.email, login: payload.login, userId: payload._id} };
    }
}