import { Body, Controller, Delete, ForbiddenException, Get, HttpCode, NotFoundException, Param, Put, Req, Res, UseGuards } from "@nestjs/common";
import { CommentViewModel } from "./models/output.model";
import { ICommentQueryRepository } from "./models/interface";
import { CommentQueryRepository } from "../repository/comment.query-repository";
import { CommentService } from "../application/comment.service";
import { CommentInputModel } from "./models/input.model";
import { Request, Response } from "express";
import { likeStatus } from "src/features/likes/api/models/input.model";
import { JwtAuthGuard } from "src/infrastructure/guards/jwt-auth.guard";
import { MeViewModel } from "src/features/auth/api/models/output.model";


@Controller('comments')
export class CommentController {
    constructor(
        protected commentQueryRepository: CommentQueryRepository,
        protected commentService: CommentService,
    ) {}
    @UseGuards(JwtAuthGuard)
    @Put(':id/like-status')
    @HttpCode(204)
    async likeStatus(
        @Param('id') id: string,
        @Body() body: { likeStatus: likeStatus },
        @Res({ passthrough: true }) res: Response,
        @Req() req: Request) {
            const user: MeViewModel | null = req.user ? req.user : null;
            const comment = await this.commentQueryRepository.findCommentById(id, user!.userId);
            if (!comment) {
                throw new NotFoundException();
            }
            const result = await this.commentService.likeStatus(user, body.likeStatus, comment);
            return result;
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    @HttpCode(204)
    async updateComment(
        @Param('id') id: string,
        @Body() body: CommentInputModel,
        @Res({ passthrough: true }) res: Response,
        @Req() req: Request) {
            const findUser = await this.commentService.findUserByComment(id);
            if (!findUser) {
                throw new NotFoundException();
            } else {
                if (req.user?.userId !== findUser.commentatorInfo.userId.toString()) {
                    throw new ForbiddenException();
                }
                const updateResult = await this.commentService.updateComment(id, body.content);
                return updateResult;
            }
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    @HttpCode(204)
    async deleteComment(
        @Param('id') id: string,
        @Res({ passthrough: true }) res: Response,
        @Req() req: Request) {
            const user = await this.commentService.findUserByComment(id);
            if (!user) {
                throw new NotFoundException();
            } else {
                if (req.user?.userId !== user.commentatorInfo.userId.toString()) {
                    throw new ForbiddenException();
                }
                const deleteComment = await this.commentService.deleteComment(id);
                return deleteComment;
            }
    }

    @Get(':id')
    async getComment(
        @Param('id') id: string,
        @Res({ passthrough: true }) res: Response,
        @Req() req: Request) {
        const userId: string | null = req.user ? req.user.userId : null;
        const comment: CommentViewModel | null = await this.commentQueryRepository.findCommentById(id, userId);
        if (!comment) {
            throw new NotFoundException();
        }
    }
}