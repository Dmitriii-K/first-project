import { Module } from "@nestjs/common";
import { BlogController } from "./api/blog.controller";
import { BlogService } from "./application/blog.service";
import { BlogRepository } from "./repository/blog.repository";
import { BlogQueryRepository } from "./repository/blog.query-repository";

@Module({
    imports: [],
    controllers: [BlogController],
    providers: [BlogService, BlogRepository, BlogQueryRepository],
    exports: []
})
export class BlogsModule {
}