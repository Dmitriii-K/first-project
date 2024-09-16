import { Module } from "@nestjs/common";
import { UserController } from "./api/users.controller";
import { UserService } from "./application/user.service";
import { UserRepository } from "./repository/user.repository";
import { UserQueryRepository } from "./repository/user.query-repository";
import { BcryptService } from "src/infrastructure/adapters/bcrypt";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "./domain/user.entity";

@Module({
    imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
    controllers: [UserController],
    providers: [UserService, UserRepository, UserQueryRepository, BcryptService],// BcryptService нужен ли?
    exports: [UserService]// в auth нужна UserModelType
})
export class UsersModule {
}