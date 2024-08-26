import { Controller, Delete, Get, Post, Put } from "@nestjs/common";
import { PostService } from "../application/post.service";
import { PostQueryRepository } from "../repository/post.query-repository";


@Controller()
export class PostController {
    constructor(
        protected postService: PostService,
        protected postQueryRepository: PostQueryRepository
    ) {}

    // @Post()
    // async createPost() {
    //         const userId: string | null = req.user ? req.user._id.toString() : null;
    //         const createResult = await this.postService.createPost(req.body, req.body.blogId); // запрос на проверку BlogId в middleware
    //         if (!createResult) {
    //             res.sendStatus(404);
    //             return;
    //         }
    //         const newPost = await this.postQueryRepository.findPostById(createResult, userId);
    //         if (newPost)
    //             res.status(201).json(newPost);
    // }
    // @Post(':id')
    // async createCommentByPostId() {
    //         const createResult = await this.postService.createCommentByPost(req.params.id, req.body, req.user);
    //         if (!createResult) {
    //             res.sendStatus(404);
    //             return;
    //         }
    //         const newComment = await this.postQueryRepository.findCommentById(createResult);
    //         if (newComment)
    //             res.status(201).json(newComment);
    // }
    // @Get()
    // async getPosts() {
    //         const user = req.user ? req.user : null;
    //         const posts = await this.postQueryRepository.getAllPosts(req.query, user);
    //         res.status(200).json(posts);

    // }
    // @Get(':id')
    // async getPostById() {
    //         const userId: string | null = req.user ? req.user._id.toString() : null;
    //         const postResult = await this.postQueryRepository.findPostById(req.params.id, userId);
    //         if (postResult) {
    //             res.status(200).json(postResult);
    //         } else {
    //             res.sendStatus(404);
    //             return;
    //         }
    // }
    // @Get(':id')
    // async getCommentByPost() {
    //         const userId: string | null = req.user ? req.user._id.toString() : null;
    //         const comments = await this.postQueryRepository.findCommentByPost(req.query, req.params.id, userId);
    //         if (comments.items.length < 1) {
    //             res.sendStatus(404);
    //             return;
    //         } else {
    //             res.status(200).json(comments);
    //         }
    // }
    // @Put(':id')
    // async updateLikeStatus() {
    //         const user = req.user ? req.user : null;
    //         const post = await this.postService.findPostById(req.params.id);
    //         if (!post) {
    //             res.sendStatus(404);
    //             return;
    //         }
    //         const result = await this.postService.updatePostLike(user, req.body.likeStatus, post);
    //         if (result) {
    //             res.sendStatus(204);
    //             return;
    //         }
    //         res.sendStatus(204);
    //         return;
    // }
    // @Put(':id')
    // async updatePost() {
    //         const findPost = await this.postService.findPostById(req.params.id);
    //         if (!findPost) {
    //             res.sendStatus(404);
    //             return;
    //         }
    //         const updateResult = await this.postService.updatePost(req.body, req.params.id);
    //         if (updateResult) {
    //             res.sendStatus(204);
    //         }
    // }
    // @Delete(':id')
    // async deletePost() {
    //         const deleteResult = await this.postService.deletePost(req.params.id);
    //         if (deleteResult) {
    //             res.sendStatus(204);
    //         } else {
    //             res.sendStatus(404);
    //             return;
    //         }
    // }
}