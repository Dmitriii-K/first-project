import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { SETTINGS } from 'src/settings/app-settings';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
    super({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        ignoreExpiration: false,
        secretOrKey: SETTINGS.JWT_SECRET_KEY,
    });
}

    async validate(payload: any) {
    return { userId: payload.sub, username: payload.username };
    }
}