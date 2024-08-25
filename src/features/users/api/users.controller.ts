import { Body, Controller, Delete, Get, HttpCode, NotFoundException, Param, Post, Query } from "@nestjs/common";
import { TypeUserPagination, UserInputModel } from "./models/input.models";
import { PaginatorUserViewModel, UserViewModel } from "./models/output.models";
import { IUserQueryRepository, IUserService } from "./models/interface";


@Controller('users')
export class UserController {
    constructor(
        protected userService: IUserService,
        protected userQueryRepository: IUserQueryRepository) {}

    @Get()
    async getUsers(@Query() query: TypeUserPagination) {
            const users: PaginatorUserViewModel = await this.userQueryRepository.getAllUsers(query);
            return users;
    }
    @Post()
    async createUser(@Body() body: UserInputModel) {
            const createResult = await this.userService.createUser(body);
            // if (!createResult) {
            //     res.status(400).json({ errorsMessages: [{ message: 'email and login should be unique', field: 'email and login' }] });
            //     return;
            // }
            const newUserDB: UserViewModel | null = await this.userQueryRepository.getUserById(createResult);
            return newUserDB;
    }
    @Delete()
    @HttpCode(204)
    async deleteUser(@Param('id') id: string) {
            const deleteResult = await this.userService.deleteUser(id);
            if (!deleteResult) {
                throw new NotFoundException(`User with id ${id} not found`);
            }
    }
}