export interface Post extends Document {
  title: string;
  content: string;
  authorId: string;
  createdAt?: Date
}