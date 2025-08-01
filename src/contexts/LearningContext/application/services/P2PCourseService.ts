import { inject, injectable } from "tsyringe";
import { P2PCourse } from "../../domain/aggregates/P2PCourse";
import { FilePost } from "../../domain/entities/FilePost";
import LiveSession from "../../domain/entities/LiveSession";
import { Post } from "../../domain/entities/Posts";
import IP2PCourseService from "../../domain/interfaces/IP2PCourseService";
import IUseCase from "../../domain/interfaces/IUseCase";

@injectable()
export class P2PCourseService implements IP2PCourseService {
  constructor(
    @inject("CreateP2PCourseUseCase")
    private readonly createP2PCourseUseCase: IUseCase<P2PCourse, P2PCourse>,
    @inject("AddSessionUseCase")
    private readonly addSessionUseCase: IUseCase<
      { p2pCourse: P2PCourse; session: LiveSession },
      LiveSession
    >,
    @inject("RemoveSessionUseCase")
    private readonly removeSessionUseCase: IUseCase<
      { p2pCourse: P2PCourse; sessionId: string },
      void
    >,
    @inject("EditSessionUseCase")
    private readonly editSessionUseCase: IUseCase<
      { p2pCourse: P2PCourse; session: LiveSession },
      LiveSession
    >,
    @inject("CompleteSessionUseCase")
    private readonly completeSessionUseCase: IUseCase<
      { p2pCourse: P2PCourse; sessionId: string },
      LiveSession
    >,
    @inject("AddPostUseCase")
    private readonly addPostUseCase: IUseCase<
      { p2pCourse: P2PCourse; post: Post },
      Post
    >,
    @inject("RemovePostUseCase")
    private readonly removePostUseCase: IUseCase<
      { p2pCourse: P2PCourse; postId: string },
      void
    >,
    @inject("EditPostUseCase")
    private readonly editPostUseCase: IUseCase<
      { p2pCourse: P2PCourse; post: Post },
      Post
    >,
    @inject("AddFilePostUseCase")
    private readonly addFilePostUseCase: IUseCase<
      { p2pCourse: P2PCourse; filePost: FilePost },
      FilePost
    >,
    @inject("RemoveFilePostUseCase")
    private readonly removeFilePostUseCase: IUseCase<
      { p2pCourse: P2PCourse; filePostId: string },
      void
    >,
    @inject("GetByUserIdAndCourseIdUseCase")
    private readonly getByUserIdAndCourseIdUseCase: IUseCase<
      { p2pCourseId: string; userId: string },
      P2PCourse
    >,
    @inject("GetP2PCourseByIdUseCase")
    private readonly getP2PCourseByIdUseCase: IUseCase<string, P2PCourse>
  ) {}
  async create(course: P2PCourse): Promise<P2PCourse> {
    return await this.createP2PCourseUseCase.execute(course);
  }
  async addSession(
    p2pCourseId: string,
    session: LiveSession
  ): Promise<LiveSession> {
    const p2pCourse = await this.getP2PCourseByIdUseCase.execute(p2pCourseId);
    return await this.addSessionUseCase.execute({ p2pCourse, session });
  }
  async removeSession(p2pCourseId: string, sessionId: string): Promise<void> {
    const p2pCourse = await this.getP2PCourseByIdUseCase.execute(p2pCourseId);
    return await this.removeSessionUseCase.execute({ p2pCourse, sessionId });
  }
  async editSession(
    p2pCourseId: string,
    session: LiveSession
  ): Promise<LiveSession> {
    const p2pCourse = await this.getP2PCourseByIdUseCase.execute(p2pCourseId);
    return await this.editSessionUseCase.execute({ p2pCourse, session });
  }
  async completeSession(
    p2pCourseId: string,
    sessionId: string
  ): Promise<LiveSession> {
    const p2pCourse = await this.getP2PCourseByIdUseCase.execute(p2pCourseId);
    return await this.completeSessionUseCase.execute({
      p2pCourse,
      sessionId,
    });
  }
  async addPost(p2pCourseId: string, post: Post): Promise<Post> {
    const p2pCourse = await this.getP2PCourseByIdUseCase.execute(p2pCourseId);
    return await this.addPostUseCase.execute({ p2pCourse, post });
  }
  async removePost(p2pCourseId: string, postId: string): Promise<void> {
    const p2pCourse = await this.getP2PCourseByIdUseCase.execute(p2pCourseId);
    return await this.removePostUseCase.execute({ p2pCourse, postId });
  }
  async editPost(p2pCourseId: string, post: Post): Promise<Post> {
    const p2pCourse = await this.getP2PCourseByIdUseCase.execute(p2pCourseId);
    return await this.editPostUseCase.execute({ p2pCourse, post });
  }
  async addFilePost(
    p2pCourseId: string,
    filePost: FilePost
  ): Promise<FilePost> {
    const p2pCourse = await this.getP2PCourseByIdUseCase.execute(p2pCourseId);
    return await this.addFilePostUseCase.execute({ p2pCourse, filePost });
  }
  async removeFilePost(p2pCourseId: string, filePostId: string): Promise<void> {
    const p2pCourse = await this.getP2PCourseByIdUseCase.execute(p2pCourseId);
    return await this.removeFilePostUseCase.execute({
      p2pCourse,
      filePostId,
    });
  }
  async getByUserIdAndCourseId(
    p2pCourseId: string,
    userId: string
  ): Promise<P2PCourse> {
    return await this.getByUserIdAndCourseIdUseCase.execute({
      p2pCourseId,
      userId,
    });
  }
}
