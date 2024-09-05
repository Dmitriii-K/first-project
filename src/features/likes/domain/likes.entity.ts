import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {HydratedDocument, Model} from 'mongoose'
import { likeStatus } from '../api/models/input.model';
import { IsEnum, IsString } from 'class-validator';
import { Trim } from 'src/infrastructure/decorators/transform/trim';


// const LikesSchema = new mongoose.Schema<LikesType>({
//     addedAt: {type: String, require: true},
//     commentId: {type: String, require: true},
//     userId: {type: String, require: true},
//     userIogin: {type: String, require: true},
//     status: { type: String, enum: Object.values(likeStatus), require: true, default: likeStatus.None }
// })
// export const LikesModel = mongoose.model<LikesType>('likes', LikesSchema)

@Schema()
export class Like {
    @Prop({ required: true })
    @IsString()
    @Trim()
    addedAt: string;

    @Prop({ required: true })
    @IsString()
    @Trim()
    commentId: string;

    @Prop({ required: true })
    @IsString()
    @Trim()
    userId: string;

    @Prop({ required: true })
    @IsString()
    @Trim()
    userLogin: string;

    @Prop({ type: String, enum: Object.values(likeStatus), required: true, default: likeStatus.None })
    @IsString()
    @Trim()
    @IsEnum(likeStatus)
    status: likeStatus;

    static createLike(commentId: string, userId: string, login: string, data: likeStatus): Like {
        const like = new this();
        
        like.addedAt = new Date().toISOString();
        like.commentId = commentId;
        like.userId = userId;
        like.userLogin = login;
        like.status = data

        return like;
    }

}

export const LikesSchema = SchemaFactory.createForClass(Like);
LikesSchema.loadClass(Like);

export type LiketDocument = HydratedDocument<Like>;

export type LikeModelType = Model<LiketDocument>