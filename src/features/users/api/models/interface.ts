import { UserDBModel } from "src/base/types/user.types";
import { UserInputModel, TypeUserPagination } from "./input.models";
import { UserViewModel, PaginatorUserViewModel } from "./output.models";

export interface IUserService {
    createUser(user: UserInputModel): Promise<string | false>;
    deleteUser(id: string): Promise<boolean>;
}

export interface IUserQueryRepository {
    getUserById(id: string): Promise<UserViewModel | null>;
    getAllUsers(query: TypeUserPagination): Promise<PaginatorUserViewModel>;
}

export interface IUserRepository {
    findUserByLogiOrEmail(data: { login: string, email: string }): Promise<UserDBModel | null>; // any?
    insertUser(user: UserDBModel): Promise<string>;
    deleteUser(id: string): Promise<boolean>;
}

export interface IBcryptService {
    createHashPassword(password: string): Promise<string>;
}