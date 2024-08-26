import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {HydratedDocument, Model} from 'mongoose'
import { Document } from 'mongoose';


@Schema({ _id: false })
class CommentatorInfo extends Document {
@Prop({ type: String, required: true })
userId: string;

@Prop({ type: String, required: true })
userLogin: string;
}

@Schema({ _id: false })
class LikesCount extends Document {
@Prop({ type: Number, required: true })
likesCount: number;

@Prop({ type: Number, required: true })
dislikesCount: number;
}

@Schema()
export class Comment extends Document {
@Prop({ type: String, required: true })
postId: string;

@Prop({ type: String, required: true })
content: string;

@Prop({ type: String, required: true })
createdAt: string;

@Prop({ type: CommentatorInfo, required: true })
commentatorInfo: CommentatorInfo;

@Prop({ type: LikesCount, required: true })
likesInfo: LikesCount;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
CommentSchema.loadClass(Comment);

export type CommentDocument = HydratedDocument<Comment>;

export type CommentModelType = Model<CommentDocument>