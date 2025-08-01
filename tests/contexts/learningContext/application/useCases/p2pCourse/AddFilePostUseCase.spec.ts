import "reflect-metadata";

import AddFilePostUseCase from "@/contexts/LearningContext/application/useCases/p2pCourse/AddFilePostUseCase";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { FilePost } from "@/contexts/LearningContext/domain/entities/FilePost";
import { P2PCourse } from "@/contexts/LearningContext/domain/aggregates/P2PCourse";

describe("AddFilePostUseCase component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  const p2pCourseRepositoryMock = {
    create: jest.fn(),
    findById: jest.fn(),
    findByUserIdAndCourseId: jest.fn(),
  };
  const filePostRepositoryMock = {
    create: jest.fn(),
    delete: jest.fn(),
  };
  const useCase = new AddFilePostUseCase(
    p2pCourseRepositoryMock,
    filePostRepositoryMock
  );
  it("Creates correctly", () => {
    expect(useCase).toBeInstanceOf(AddFilePostUseCase);
  });

  it("Throws error if there is no course", () => {
    const filePost = FilePost.createFromPrimitive({
      url: "https://www.youtube.com/",
      creationDate: new Date(),
    });
    p2pCourseRepositoryMock.findById.mockResolvedValue(null);
    expect(
      useCase.execute({ p2pCourseId: "p2pCourseTestId", filePost })
    ).rejects.toThrow(ApiError);
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
    p2pCourseRepositoryMock.findById.mockResolvedValue(p2pCourse);
    filePostRepositoryMock.create.mockResolvedValue(filePost);
    expect(
      useCase.execute({ p2pCourseId: "p2pCourseTestId", filePost })
    ).resolves.toBe(filePost);
  });
});
