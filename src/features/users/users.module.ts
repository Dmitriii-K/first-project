import { Module } from "@nestjs/common";
import { UserController } from "./api/users.controller";
import { UserService } from "./application/user.service";
import { UserRepository } from "./repository/user.repository";
import { UserQueryRepository } from "./repository/user.query-repository";
import { BcryptService } from "src/infrastructure/adapters/bcrypt";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "./domain/user.entity";
import { CommandBus } from "@nestjs/cqrs";

@Module({
    imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
    controllers: [UserController],
    providers: [UserService, UserRepository, UserQueryRepository, BcryptService, CommandBus], // CommandBus ???
    exports: [MongooseModule, UserService, UserRepository, UserQueryRepository, BcryptService]
})
export class UsersModule {
}