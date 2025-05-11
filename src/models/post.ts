import { Schema, model } from 'mongoose';
import { Post } from '../interfaces/post';

const postSchema = new Schema<Post>({
  title: { type: String, required: true },
  content: { type: Schema.Types.Mixed, required: true }, 
  authorId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const PostModel = model<Post>('Post', postSchema);