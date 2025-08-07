import { P2PCourse } from "../aggregates/P2PCourse";
import LiveSession from "../entities/LiveSession";
import { Post } from "../entities/Posts";
import { FilePost } from "../entities/FilePost";
import { P2PCourseByTeacherDB, P2PCourseDB } from "../dtos/Dbtypes";

export default interface IP2PCourseService {
  create(course: P2PCourse): Promise<P2PCourse>;

  addSession(p2pCourseId: string, session: LiveSession): Promise<LiveSession>;

  removeSession(p2pCourseId: string, sessionId: string): Promise<void>;

  editSession(p2pCourseId: string, session: LiveSession): Promise<LiveSession>;

  completeSession(p2pCourseId: string, sessionId: string): Promise<LiveSession>;

  addPost(courseId: string, post: Post): Promise<Post>;

  removePost(courseId: string, postId: string): Promise<void>;

  editPost(courseId: string, post: Post): Promise<Post>;

  addFilePost(p2pCourseId: string, filePost: FilePost): Promise<FilePost>;

  removeFilePost(p2pCourseId: string, filePostId: string): Promise<void>;

  getByUserIdAndCourseId(
    p2pCourseId: string,
    userId: string
  ): Promise<P2PCourse>;

  getByUserId(userId: String): Promise<P2PCourseDB[]>;
  getByTeacherId(
    userId: string
  ): Promise<P2PCourseByTeacherDB[]>
}
