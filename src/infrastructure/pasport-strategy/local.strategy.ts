import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from 'src/features/auth/application/auth.service';
import { UserDocument } from 'src/features/users/domain/user.entity';

export class UserFromAuth {
    user: {
    email: string
    login: string
    userId:string}
}

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
    super({ usernameField: 'login' });
}

    async validate(login: string, password: string): Promise<UserFromAuth> {
    const user = await this.authService.validateUser(login, password);
    if (!user) {
        throw new UnauthorizedException();
    }
    return { user:{email: user.email, login: user.login, userId: user._id} };
    }
}