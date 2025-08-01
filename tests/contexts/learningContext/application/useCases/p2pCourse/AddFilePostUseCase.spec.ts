import "reflect-metadata";

import AddFilePostUseCase from "@/contexts/LearningContext/application/useCases/p2pCourse/AddFilePostUseCase";
import { FilePost } from "@/contexts/LearningContext/domain/entities/FilePost";
import { P2PCourse } from "@/contexts/LearningContext/domain/aggregates/P2PCourse";

describe("AddFilePostUseCase component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const filePostRepositoryMock = {
    create: jest.fn(),
    delete: jest.fn(),
  };
  const useCase = new AddFilePostUseCase(filePostRepositoryMock);
  it("Creates correctly", () => {
    expect(useCase).toBeInstanceOf(AddFilePostUseCase);
  });

  it("Executes correctly", () => {
    const filePost = FilePost.createFromPrimitive({
      url: "https://www.youtube.com/",
      creationDate: new Date(),
    });
    const p2pCourse = P2PCourse.createFromPrimitive({
      studentId: "studentId",
      teacherId: "teacherId",
      chatId: "chatId",
      name: "Test name",
      remainingSession: 5,
      status: "ACTIVE",
      posts: [],
      files: [],
      sessions: [],
    });
    filePostRepositoryMock.create.mockResolvedValue(filePost);
    expect(useCase.execute({ p2pCourse, filePost })).resolves.toBe(filePost);
  });
});
