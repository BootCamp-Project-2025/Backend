import "reflect-metadata";
import { P2PCourseService } from "@/contexts/LearningContext/application/services/P2PCourseService";
import { P2PCourse } from "@/contexts/LearningContext/domain/aggregates/P2PCourse";
import LiveSession from "@/contexts/LearningContext/domain/entities/LiveSession";
import { Post } from "@/contexts/LearningContext/domain/entities/Posts";
import { FilePost } from "@/contexts/LearningContext/domain/entities/FilePost";

describe("P2PCourseService component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const createP2PCourseUseCase = { execute: jest.fn() };
  const addSessionUseCase = { execute: jest.fn() };
  const removeSessionUseCase = { execute: jest.fn() };
  const editSessionUseCase = { execute: jest.fn() };
  const completeSessionUseCase = { execute: jest.fn() };
  const addPostUseCase = { execute: jest.fn() };
  const removePostUseCase = { execute: jest.fn() };
  const editPostUseCase = { execute: jest.fn() };
  const addFilePostUseCase = { execute: jest.fn() };
  const removeFilePostUseCase = { execute: jest.fn() };
  const getByTeacherIdAndCourseIdUseCase = { execute: jest.fn() };
  const getP2PCourseByIdUseCase = { execute: jest.fn() };
  const getByUserId = { execute: jest.fn() };
  const getByTeacherId = { execute: jest.fn() };
  const service = new P2PCourseService(
    createP2PCourseUseCase,
    addSessionUseCase,
    removeSessionUseCase,
    editSessionUseCase,
    completeSessionUseCase,
    addPostUseCase,
    removePostUseCase,
    editPostUseCase,
    addFilePostUseCase,
    removeFilePostUseCase,
    getByTeacherIdAndCourseIdUseCase,
    getP2PCourseByIdUseCase,
    getByUserId,
    getByTeacherId
  );

  const p2pCourse = P2PCourse.createFromPrimitive({
    studentId: "studentId",
    teacherId: "teacherId",
    chatId: "chatId",
    name: "Test name",
    remainingSession: 10,
    status: "ACTIVE",
    posts: [],
    files: [],
    sessions: [],
  });

  getP2PCourseByIdUseCase.execute.mockResolvedValue(p2pCourse);

  it("Creates correctly", () => {
    expect(service).toBeInstanceOf(P2PCourseService);
  });

  it("Calls createP2PCourseUseCase correctly", async () => {
    const p2pCourse = P2PCourse.createFromPrimitive({
      studentId: "testId",
      teacherId: "testTeacherId",
      chatId: "testChatId",
      name: "Test course",
      remainingSession: 5,
      status: "ACTIVE",
      posts: [],
      files: [],
      sessions: [],
    });
    await service.create(p2pCourse);
    expect(createP2PCourseUseCase.execute).toHaveBeenCalledWith(p2pCourse);
  });

  it("Calls addSessionUseCase correctly", async () => {
    const session = LiveSession.createFromPrimitive({
      url: "https://www.youtube.com/",
      dateOfTheSession: new Date(),
      creationDate: new Date(),
      status: "PENDING",
    });
    await service.addSession("testCourseId", session);
    expect(addSessionUseCase.execute).toHaveBeenCalledWith({
      p2pCourse,
      session,
    });
  });

  it("Calls removeSessionUseCase correctly", async () => {
    await service.removeSession("testCourseId", "testSessionId");
    expect(removeSessionUseCase.execute).toHaveBeenCalledWith({
      p2pCourse,
      sessionId: "testSessionId",
    });
  });

  it("Calls editSessionUseCase correctly", async () => {
    const session = LiveSession.createFromPrimitive({
      url: "https://www.youtube.com/",
      dateOfTheSession: new Date(),
      creationDate: new Date(),
      status: "PENDING",
    });
    await service.editSession("p2pCourseTestId", session);
    expect(editSessionUseCase.execute).toHaveBeenCalledWith({
      p2pCourse,
      session,
    });
  });

  it("Calls completeSessionUseCase correctly", async () => {
    await service.completeSession("p2pCourseTestId", "sessionTestId");
    expect(completeSessionUseCase.execute).toHaveBeenCalledWith({
      p2pCourse,
      sessionId: "sessionTestId",
    });
  });

  it("Calls removePostUseCase correctly", async () => {
    await service.removePost("p2pCourseTestId", "postTestId");
    expect(removePostUseCase.execute).toHaveBeenCalledWith({
      p2pCourse,
      postId: "postTestId",
    });
  });

  it("Calls addPostUseCase correctly", async () => {
    const post = Post.createFromPrimitive({
      title: "Test title",
      url: "https://www.youtube.com/",
      creationDate: new Date(),
    });
    await service.addPost("p2pCourseTestId", post);
    expect(addPostUseCase.execute).toHaveBeenCalledWith({
      p2pCourse,
      post,
    });
  });

  it("Calls editPostUseCase correctly", async () => {
    const post = Post.createFromPrimitive({
      title: "Test title",
      url: "https://www.youtube.com/",
      creationDate: new Date(),
    });
    await service.editPost("p2pCourseTestId", post);
    expect(editPostUseCase.execute).toHaveBeenCalledWith({
      p2pCourse,
      post,
    });
  });

  it("Calls addFilePostUseCase correctly", async () => {
    const filePost = FilePost.createFromPrimitive({
      url: "https://www.youtube.com/",
      creationDate: new Date(),
    });
    await service.addFilePost("p2pCourseTestId", filePost);
    expect(addFilePostUseCase.execute).toHaveBeenCalledWith({
      p2pCourse,
      filePost,
    });
  });

  it("Calls removeFilePostUseCase correctly", async () => {
    await service.removeFilePost("p2pCourseTestId", "filePostTestId");
    expect(removeFilePostUseCase.execute).toHaveBeenCalledWith({
      p2pCourse,
      filePostId: "filePostTestId",
    });
  });

  it("Calls getByTeacherIdAndCourseIdUseCase correctly", async () => {
    await service.getByUserIdAndCourseId("p2pCourseTestId", "userTestId");
    expect(getByTeacherIdAndCourseIdUseCase.execute).toHaveBeenCalledWith({
      p2pCourseId: "p2pCourseTestId",
      userId: "userTestId",
    });
  });
});
