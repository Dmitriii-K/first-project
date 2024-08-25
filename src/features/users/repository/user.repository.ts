import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { UserDBModel } from "src/base/types/user.types";
import { User, UserModelType } from "../domain/user.entity";
import { IUserRepository } from "../api/models/interface";

@Injectable()
export class UserRepository implements IUserRepository{
    constructor(@InjectModel(User.name) private userModel: UserModelType) {}

    async insertUser(user: UserDBModel) {
        const saveResult = await this.userModel.create(user);
        return saveResult._id.toString();
    }
    async findUserById(userId: string) {
        const user = await this.userModel.findOne({ _id: userId });
        if (!user) {
            return null;
        }
        return user;
    }
    async findUserByMiddleware (id: string) {
        const user = await this.userModel.findOne({_id: id});
        if (!user) {
            return null;
        }
        return user
    }
    async findUserByLogiOrEmail(data: { login: string, email: string }) {
        return this.userModel.findOne({ $or: [{ login: data.login }, { email: data.email }] });
    }
    async deleteUser(userId: string) {
        const user = await this.userModel.deleteOne({ _id: userId });
        if (user.deletedCount === 1) {
            return true;
        }
        return false;
    }
}