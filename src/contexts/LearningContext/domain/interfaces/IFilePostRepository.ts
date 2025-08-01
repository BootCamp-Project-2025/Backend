import { FilePost } from "../entities/FilePost";

export default interface IFilePostRepository {
  create(p2pCourseId: string, filePost: FilePost): Promise<FilePost>;
  delete(filePostId: string): Promise<void>;
}
