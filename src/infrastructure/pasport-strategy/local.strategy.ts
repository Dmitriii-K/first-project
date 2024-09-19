import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from 'src/features/auth/application/auth.service';
import { BcryptService } from '../adapters/bcrypt';


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(
        private authService: AuthService,
        private bcryptService: BcryptService,
    ) {
    super({ usernameField: 'loginOrEmail',passwordField: "password" });
}
    async validate(loginOrEmail: string, password: string) {
    const user = await this.authService.validateUser(loginOrEmail, password);
    if (!user) {
        throw new UnauthorizedException('User is not found');
    }
    const isCorrect = await this.bcryptService.comparePasswords(password, user.password);
    if (!isCorrect) {
        throw new UnauthorizedException('Password or login is wrong');
    }
    return {email: user.email, login: user.login, userId: user._id.toString()};
    }
}