import { AggregateRoot } from "@/contexts/Shared/domain/AgregateRoot";
import P2PCourseStatus, {
  P2PStatusType,
} from "../valueObjects/P2PCourseStatus";
import { Post, PrimitivePostProps } from "../entities/Posts";
import { FilePost, PrimitiveFilePostProps } from "../entities/FilePost";
import LiveSession, {
  PrimitiveLiveSessionProps,
} from "../entities/LiveSession";
import { UniqueEntityID } from "@/contexts/Shared/domain/UniqueEntityID";
import P2PRemainingSessions from "../valueObjects/P2PRemainingSessions";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { StatusCodes } from "http-status-codes";
import UserId from "../valueObjects/UserId";
import { P2PCourseName } from "../valueObjects/P2PCourseName";
import ChatId from "../valueObjects/ChatId";
import { CourseName } from "../valueObjects/CourseName";

export type PrimitiveP2PCourseProps = {
  studentId: string;
  teacherId: string;
  chatId: string;
  name: string;
  remainingSession: number;
  status: P2PStatusType;
  posts: PrimitivePostProps[];
  files: PrimitiveFilePostProps[];
  sessions: PrimitiveLiveSessionProps[];
};

type P2PCourseProps = {
  studentId: UserId;
  teacherId: UserId;
  chatId: UserId;
  name: P2PCourseName;
  remainingSessions: P2PRemainingSessions;
  status: P2PCourseStatus;
  posts: Post[];
  files: FilePost[];
  sessions: LiveSession[];
};

export class P2PCourse extends AggregateRoot<P2PCourseProps> {
  private constructor(props: P2PCourseProps, id?: UniqueEntityID) {
    super(props, id);
  }

  /**
   * @description This method create a new instance of P2PCourse from a object with value objects.
   * @param props Object with the value objects
   * @param id Instance of UniqueEntityID, if not sent, a new instance will be created
   * @returns A new instance of P2PCourse
   */
  public static create(props: P2PCourseProps, id?: UniqueEntityID): P2PCourse {
    return new P2PCourse({ ...props }, id);
  }

  /**
   * @description This method create a new instance of P2PCourse from a object with primitive values
   * @param props Object with the primitive values of the P2PCourse
   * @param id A new instance of UniqueEntityID will be created with this value, if not sent, a random value will be asigned
   * @returns A new instance of P2PCourse
   */
  public static createFromPrimitive(
    props: PrimitiveP2PCourseProps,
    id?: string
  ) {
    return P2PCourse.create(
      this.createPropsFromPrimitive(props),
      new UniqueEntityID(id)
    );
  }

  private static createPropsFromPrimitive(
    props: PrimitiveP2PCourseProps
  ): P2PCourseProps {
    return {
      teacherId: UserId.create({ userId: props.teacherId }),
      studentId: UserId.create({ userId: props.studentId }),
      chatId: ChatId.create({ chatId: props.chatId }),
      name: P2PCourseName.create({ name: props.name }),
      status: P2PCourseStatus.create({ status: props.status }),
      posts: props.posts.map((post) => Post.createFromPrimitive(post, post.id)),
      files: props.files.map((file) =>
        FilePost.createFromPrimitive(file, file.id)
      ),
      sessions: props.sessions.map((session) =>
        LiveSession.createFromPrimitive(session, session.id)
      ),
      remainingSessions: P2PRemainingSessions.create({
        remainingSession: props.remainingSession,
      }),
    };
  }

  get name(): P2PCourseName {
    return this.props.name;
  }
  get status(): P2PCourseStatus {
    return this.props.status;
  }
  get posts(): Post[] {
    return this.props.posts;
  }
  get files(): FilePost[] {
    return this.props.files;
  }
  get sessions(): LiveSession[] {
    return this.props.sessions;
  }

  get remainingSessions(): P2PRemainingSessions {
    return this.props.remainingSessions;
  }

  get id(): UniqueEntityID {
    return this._id;
  }

  get studentId(): string {
    return this.props.studentId.value;
  }

  get teacherId(): string {
    return this.props.teacherId.value;
  }

  get chatId(): string {
    return this.props.chatId.value;
  }

  public cancelCourse(): void {
    this.props.status = P2PCourseStatus.create({ status: "CANCELED" });
  }

  /**
   * @description Mark a session as completed and reduces the number of remaining session of the course
   * @param sessionId Id of the session that was completed
   */
  public completeSession(sessionId: UniqueEntityID): void {
    this.validateRemainingSessionsOrThrow();
    const sessionIndex = this.props.sessions.findIndex((session) =>
      session.id.equals(sessionId)
    );
    this.props.sessions[sessionIndex].complete();
    this.reduceRemainingSessions();
  }

  private reduceRemainingSessions() {
    this.props.remainingSessions = P2PRemainingSessions.create({
      remainingSession: this.remainingSessions.value - 1,
    });
  }

  public validateRemainingSessionsOrThrow() {
    if (this.remainingSessions.value === 0) {
      throw new ApiError(
        StatusCodes.BAD_REQUEST,
        "This course alredy has finished all its sessions"
      );
    }
  }

  public cancelSession(sessionId: UniqueEntityID): void {
    const session = this.props.sessions.find((session) =>
      session.id.equals(sessionId)
    );
    if (!session) {
      throw new ApiError(StatusCodes.NOT_FOUND, "Session not found");
    }
    if (session.status.value === "COMPLETED") {
      throw new ApiError(
        StatusCodes.CONFLICT,
        "A completed session can not be canceled"
      );
    }
    session.cancel();
  }

  /**
   * @description Delete a session of the sessions list
   * @throws If session was completed throw an ApiError
   */
  public deleteSession(sessionId: UniqueEntityID): void {
    const deleteIndex = this.props.sessions.findIndex((session) => {
      session.id.equals(sessionId);
    });
    this.validateDeleteOrThrow(deleteIndex);
    this.props.sessions.splice(deleteIndex, 0);
  }

  /**
   * @description Check if the session that we are trying to delete is completed, in that case it throws
   * @throws If the session we are trying to delete is completed, it throws an ApiError
   */
  private validateDeleteOrThrow(deleteIndex: number): void {
    if (deleteIndex === -1) {
      throw new ApiError(
        StatusCodes.NOT_FOUND,
        "The session you are trying to delete doesn't exist"
      );
    }
    if (this.props.sessions[deleteIndex].status.value === "COMPLETED") {
      throw new ApiError(
        StatusCodes.NOT_FOUND,
        "A completed session can't be deleted"
      );
    }
  }

  /**
   * @description Add a new session to the sessions list if the number of existing sessions doesnt excede the remaining sessions
   * @throws If alredy has enoguh sessions to cover the remaining session
   */
  public addSession(session: LiveSession) {
    this.availableRemainingSessionsOrThrow();
    this.props.sessions.push(session);
  }

  public availableRemainingSessionsOrThrow() {
    if (this.sessions.length === this.remainingSessions.value) {
      throw new ApiError(StatusCodes.CONFLICT, "Cant have more sessions");
    }
  }

  public addPost(post: Post) {
    this.props.posts.push(post);
  }

  public deletePost(postId: UniqueEntityID) {
    this.props.posts = this.props.posts.filter(
      (post) => !post.id.equals(postId)
    );
  }

  public addFilePost(file: FilePost) {
    this.props.files.push(file);
  }

  public changeName(name: string) {
    this.props.name = CourseName.create({ name });
  }

  public deleteFilePost(fileId: UniqueEntityID) {
    this.props.files = this.props.files.filter(
      (file) => !file.id.equals(fileId)
    );
  }

  public getSession(sessionId: UniqueEntityID): LiveSession {
    const sessionIndex = this.sessions.findIndex((session) =>
      session.id.equals(sessionId)
    );

    if (sessionIndex === -1) {
      throw new ApiError(StatusCodes.NOT_FOUND, "Session not found");
    }
    return this.sessions[sessionIndex];
  }

  public updateSession(newSession: LiveSession): LiveSession {
    const sessionIndex = this.sessions.findIndex((session) =>
      session.id.equals(newSession.id)
    );
    if (sessionIndex === -1) {
      throw new ApiError(StatusCodes.NOT_FOUND, "Session not found");
    }
    P2PCourse.validateChanges<LiveSession>(
      newSession,
      this.sessions[sessionIndex]
    );
    this.sessions[sessionIndex] = newSession;
    return this.sessions[sessionIndex];
  }

  public getPost(postId: UniqueEntityID): Post {
    const postIndex = this.posts.findIndex((post) => post.id.equals(postId));

    if (postIndex === -1) {
      throw new ApiError(StatusCodes.NOT_FOUND, "Post not found");
    }
    return this.posts[postIndex];
  }

  public updatePost(newPost: Post): Post {
    const postIndex = this.posts.findIndex((post) =>
      post.id.equals(newPost.id)
    );
    if (postIndex === -1) {
      throw new ApiError(StatusCodes.NOT_FOUND, "Post not found");
    }
    P2PCourse.validateChanges<Post>(newPost, this.posts[postIndex]);
    this.posts[postIndex] = newPost;
    return this.posts[postIndex];
  }

  public getFilePost(filePostId: UniqueEntityID): FilePost {
    const filePostIndex = this.files.findIndex((filePost) =>
      filePost.id.equals(filePostId)
    );

    if (filePostIndex === -1) {
      throw new ApiError(StatusCodes.NOT_FOUND, "File not found");
    }
    return this.files[filePostIndex];
  }

  public updateFilePost(newFilePost: FilePost): FilePost {
    const filePostIndex = this.files.findIndex((filePost) =>
      filePost.id.equals(newFilePost.id)
    );
    if (filePostIndex === -1) {
      throw new ApiError(StatusCodes.NOT_FOUND, "File not found");
    }
    P2PCourse.validateChanges<FilePost>(newFilePost, this.files[filePostIndex]);
    this.files[filePostIndex] = newFilePost;
    return this.files[filePostIndex];
  }

  private static validateChanges<T>(object1: T, object2: T) {
    if (JSON.stringify(object1) === JSON.stringify(object2)) {
      throw new ApiError(StatusCodes.OK, "No changes where made");
    }
  }
}
