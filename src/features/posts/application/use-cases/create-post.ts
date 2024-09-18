import { PostRepository } from "../../repository/post.repository";
import { Post } from "../../domain/post.entity";
import { CommandHandler } from "@nestjs/cqrs";
import { PostInputModel } from "../../api/models/input.model";
import { BadRequestException } from "@nestjs/common";

export class CreatePostCommand {
    constructor(
        public body: PostInputModel,
        public id: string,
        ) {}
}

@CommandHandler(CreatePostCommand)
export class CreatePostUseCase {
    constructor(
        private postRepository: PostRepository
    ) {}

    async execute(command: CreatePostCommand) {
        const {body, id} = command;

        const findBlogNameForId = await this.postRepository.findBlogNameForId(id);
        if (!findBlogNameForId) {
            throw new BadRequestException({ errorsMessages: { message: "This blog is incorrect", field: "blog" } });
        }
        const newPost: Post = Post.createPost(body.title, body.shortDescription, body.content, body.blogId, findBlogNameForId.name);
        return this.postRepository.insertPost(newPost);
    }
}