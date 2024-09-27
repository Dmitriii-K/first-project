import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Model } from 'mongoose';

// const BlogSchema = new mongoose.Schema<BlogDbType>({
//     name: { type: String, require: true },
//     description: { type: String, require: true },
//     websiteUrl: { type: String, require: true },
//     createdAt: { type: String, require: true },
//     isMembership: { type: Boolean, require: true }
// })
// export const BlogModel = mongoose.model<BlogDbType>('blogs', BlogSchema)

@Schema()
export class Blog {
@Prop({ required: true })
name: string;

@Prop({ required: true })
description: string;

@Prop({ required: true })
websiteUrl: string;

@Prop({ required: true })
createdAt: string;

@Prop({ required: true })
isMembership: boolean;

static createBlog(name: string, description: string, websiteUrl: string): Blog {
    const blog = new this();
    
    blog.name = name;
    blog.description = description;
    blog.websiteUrl = websiteUrl;
    blog.createdAt = new Date().toISOString();
    blog.isMembership = false;
    return blog;
}
}

export const BlogSchema = SchemaFactory.createForClass(Blog);
BlogSchema.loadClass(Blog);

export type BlogDocument = HydratedDocument<Blog>;

export type BlogModelType = Model<BlogDocument>