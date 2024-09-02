import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from '@nestjs/common';
import { Observable } from 'rxjs';
import {Request} from "express";
import { UserRepository } from 'src/features/users/repository/user.repository';
import { JwtService } from '../../adapters/jwt.service';
import { SessionRepository } from 'src/features/sessions/repository/session.repository';

// @Injectable()
// export class BearerAuthGuard implements CanActivate {
//     constructor(
//         protected userRepository: UserRepository,
//         protected sessionsRepository: SessionRepository,
//         protected jwtService: JwtService,) {}

//     canActivate(
//     context: ExecutionContext,
//     ): boolean | Promise<boolean> | Observable<boolean> {
//     const request = context.switchToHttp().getRequest<Request>();

//         if(!request.cookies.refreshToken) {
//             throw new UnauthorizedException();
//     }
//     const token = request.cookies.refreshToken;
//     const payload = this.jwtService.getUserIdByToken(token);
//     if(!payload) 
//         throw new UnauthorizedException();
    
//     const user = this.userRepository.findUserByMiddleware(payload.userId)
//     if(user) {
//         request.user = user;
//         request.deviceId = payload.deviceId;
//       const dateIat = new Date(payload.iat * 1000).toISOString();
//         const session = this.sessionsRepository.findSessionByMiddleware(request.deviceId)
//         if(session.iat !== dateIat) {
//             throw new UnauthorizedException();
//         }
//     }
//     return true;
// }
// }