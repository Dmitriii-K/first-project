import { BasicStrategy as Strategy } from 'passport-http';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class BasicStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly configService: ConfigService,
    ) {
        super({
            //passReqToCallback: true
        });
    }

    public validate = async ( username: string, password: string): Promise<boolean> => {
        const adminName = this.configService.get<string>("ADMIN_NAME");
        const adminPass = this.configService.get<string>("ADMIN_PASS");

        if (adminName === username && adminPass === password) {
            return true;
        }
        throw new UnauthorizedException();
    }
}