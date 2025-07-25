import { AggregateRoot } from "@/contexts/Shared/domain/AgregateRoot";
import { CourseName } from "../valueObjects/CourseName";
import P2PCourseStatus, {
  P2PStatusType,
} from "../valueObjects/P2PCourseStatus";
import { Post, PrimitivePostProps } from "../entities/Posts";
import { FilePost, PrimitiveFilePostProps } from "../entities/FilePost";
import LiveSession, {
  PrimitiveLiveSessionProps,
} from "../entities/LiveSession";
import { UniqueEntityID } from "@/contexts/Shared/domain/UniqueEntityID";
import P2PRemainingSession from "../valueObjects/P2PremainingSession";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { StatusCodes } from "http-status-codes";
import UserId from "../valueObjects/UserId";

export type PrimitiveP2PCourseProps = {
  studentId: string;
  teacherId: string;
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
  name: CourseName;
  remainingSession: P2PRemainingSession;
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
      name: CourseName.create({ name: props.name }),
      status: P2PCourseStatus.create({ status: props.status }),
      posts: props.posts.map((post) => Post.createFromPrimitive(post)),
      files: props.files.map((file) => FilePost.createFromPrimitive(file)),
      sessions: props.sessions.map((session) =>
        LiveSession.createFromPrimitive(session)
      ),
      remainingSession: P2PRemainingSession.create({
        remainingSession: props.remainingSession,
      }),
    };
  }

  get name(): CourseName {
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

  get remainingSessions(): P2PRemainingSession {
    return this.props.remainingSession;
  }

  get id(): UniqueEntityID {
    return this._id;
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
    this.props.remainingSession = P2PRemainingSession.create({
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
    const sessionIndex = this.props.sessions.findIndex((session) =>
      session.id.equals(sessionId)
    );
    this.props.sessions[sessionIndex].cancel();
  }

  public deleteSession(sessionId: UniqueEntityID) {
    this.props.sessions = this.props.sessions.filter(
      (session) => !session.id.equals(sessionId)
    );
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
      throw new ApiError(StatusCodes.CONFLICT);
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

  public deleteFilePost(fileId: UniqueEntityID) {
    this.props.files = this.props.files.filter(
      (file) => !file.id.equals(fileId)
    );
  }
}
