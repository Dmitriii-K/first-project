import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from '@nestjs/common';
import { Observable } from 'rxjs';
import {Request} from "express";
import { UserRepository } from 'src/features/users/repository/user.repository';
import { JwtService } from 'src/infrastructure/adapters/jwt.service';

@Injectable()
export class SoftAuthGuard implements CanActivate {
    constructor(
        protected userRepository: UserRepository,
        protected jwtService: JwtService,) {}

    async canActivate(
    context: ExecutionContext,
    ): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    if(!request.headers.authorization) {
        return true;
    }
    const token = request.headers.authorization.split(" ")[1];
    const payload = this.jwtService.getUserIdByToken(token);
    if(!payload) {
        return true;
    }
    const user = await this.userRepository.findUserByMiddleware(payload.userId)

    if(user) {
        request.user = {email: user.email, login: user.login, userId: user._id.toString()};
    } else {
        return true;
    }
    return true;
    }
}