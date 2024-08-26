import { Controller, Get, NotFoundException, Param } from "@nestjs/common";
import { CommentViewModel } from "./models/output.model";
import { ICommentQueryRepository } from "./models/interface";
import { CommentQueryRepository } from "../repository/comment.query-repository";


@Controller('comments')
export class CommentController {
    constructor(
        protected commentQueryRepository: CommentQueryRepository
    ) {}

    @Get(':id')
    async getComment(@Param('id') id: string) {
        // const userId: string | null = req.user ? req.user._id.toString() : null;
        const comment: CommentViewModel | null = await this.commentQueryRepository.findCommentById(id/*, userId*/);
        if (!comment) {
            throw new NotFoundException(`Comment is not found`);
        }
    }
    // async updateComment(req: Request<ComId, {}, CommentInputModel>, res: Response) {
    //     try {
    //         const findUser = await this.commentService.findUserByComment(req.params.id);
    //         if (!findUser) {
    //             res.sendStatus(404); // null
    //         } else {
    //             if (req.user._id.toString() !== findUser.commentatorInfo.userId.toString()) {
    //                 res.sendStatus(403);
    //                 return;
    //             }
    //             const updateResult = await this.commentService.updateComment(req.params.id, req.body.content);
    //             if (updateResult) {
    //                 res.sendStatus(204);
    //             }
    //         }
    //         return;
    //     } catch (error) {
    //         console.log(error);
    //         res.sendStatus(500);
    //     }
    // }
    // async likeStatus(req: Request<ComId, {}, { likeStatus: likeStatus }>, res: Response) {
    //     try {
    //         const user = req.user ? req.user : null;
    //         const comment = await this.commentQueryRepository.findCommentById(req.params.id, user._id.toString());
    //         if (!comment) {
    //             res.sendStatus(404);
    //             return;
    //         }
    //         const result = await this.commentService.likeStatus(user, req.body.likeStatus, comment);
    //         if (result) {
    //             res.sendStatus(204);
    //             return;
    //         }

    //         res.sendStatus(204);
    //         return;
    //     } catch (error) {
    //         console.log(error);
    //         res.sendStatus(500);
    //     }
    // }
    // async deleteComment(req: Request, res: Response) {
    //     try {
    //         const user = await this.commentService.findUserByComment(req.params.id);
    //         if (!user) {
    //             res.sendStatus(404); // null
    //         } else {
    //             if (req.user._id.toString() !== user.commentatorInfo.userId.toString()) {
    //                 res.sendStatus(403);
    //                 return;
    //             }
    //             const deleteComment = await this.commentService.deleteComment(req.params.id);
    //             if (deleteComment) {
    //                 res.sendStatus(204); // true
    //             }
    //         }
    //         return;
    //     } catch (error) {
    //         console.log(error);
    //         res.sendStatus(500);
    //     }
    // }
}