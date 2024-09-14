import { Module } from "@nestjs/common";
import { UserController } from "./api/users.controller";
import { UserService } from "./application/user.service";
import { UserRepository } from "./repository/user.repository";
import { UserQueryRepository } from "./repository/user.query-repository";

@Module({
    imports: [],
    controllers: [UserController],
    providers: [UserService, UserRepository, UserQueryRepository],
    exports: [UserService]
})
export class UsersModule {
}