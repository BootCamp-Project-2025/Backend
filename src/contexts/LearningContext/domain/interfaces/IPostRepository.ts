import { Post } from "../entities/Posts";

export default interface IPostRepository {
  create(p2pCourseId: string, post: Post): Promise<Post>;
  update(postId: string, post: Post): Promise<Post>;
  delete(postId: string): Promise<void>;
}
