import "reflect-metadata";
import AddPostUseCase from "@/contexts/LearningContext/application/useCases/p2pCourse/AddPostUseCase";
import { P2PCourse } from "@/contexts/LearningContext/domain/aggregates/P2PCourse";
import { Post } from "@/contexts/LearningContext/domain/entities/Posts";

describe("AddPostUseCase component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const postRepositoryMock = {
    create: jest.fn(),
    delete: jest.fn(),
    update: jest.fn(),
  };

  it("Creates correctly", () => {
    const useCase = new AddPostUseCase(postRepositoryMock);
    expect(useCase).toBeInstanceOf(AddPostUseCase);
  });

  it("Adds a new post correctly", () => {
    const useCase = new AddPostUseCase(postRepositoryMock);
    const post = Post.createFromPrimitive({
      title: "Test title",
      description: "Test description",
      creationDate: new Date(),
    });
    const p2pCourse = P2PCourse.createFromPrimitive({
      studentId: "studentId",
      teacherId: "teacherId",
      chatId: "chatId",
      name: "Test Name",
      remainingSession: 5,
      status: "ACTIVE",
      posts: [],
      files: [],
      sessions: [],
    });
    postRepositoryMock.create.mockResolvedValue(p2pCourse);
    expect(useCase.execute({ p2pCourse, post })).resolves.toBe(p2pCourse);
  });
});
