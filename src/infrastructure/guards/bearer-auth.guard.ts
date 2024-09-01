import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from '@nestjs/common';
import { Observable } from 'rxjs';
import {Request} from "express";
import { UserRepository } from 'src/features/users/repository/user.repository';
import { JwtService } from '../adapters/jwt.service';

@Injectable()
export class BearerAuthGuard implements CanActivate {
    constructor(
        protected userRepository: UserRepository,
        protected jwtService: JwtService,) {}

    canActivate(
    context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    if(!request.headers.authorization) {
        throw new UnauthorizedException();
    }
    const token = request.headers.authorization.split(" ")[1];
    const payload = this.jwtService.getUserIdByToken(token);
    if(!payload) {
        throw new UnauthorizedException();
    }
    const user = this.userRepository.findUserByMiddleware(payload.userId)
    if(user) {
    request.user = user;
    } else {
        throw new UnauthorizedException();
    }
    return true;
    }
}