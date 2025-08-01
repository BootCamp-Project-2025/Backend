import "reflect-metadata";

import { FilePost } from "@/contexts/LearningContext/domain/entities/FilePost";
import { P2PCourse } from "@/contexts/LearningContext/domain/aggregates/P2PCourse";
import RemoveFilePostUseCase from "@/contexts/LearningContext/application/useCases/p2pCourse/RemoveFilePostUseCase";

describe("RemoveFilePostUseCase component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const filePostRepositoryMock = {
    create: jest.fn(),
    delete: jest.fn(),
  };
  const useCase = new RemoveFilePostUseCase(filePostRepositoryMock);
  it("Creates correctly", () => {
    expect(useCase).toBeInstanceOf(RemoveFilePostUseCase);
  });

  it("Removes correctly", () => {
    const p2pCourse = P2PCourse.createFromPrimitive({
      studentId: "studentId",
      teacherId: "teacherId",
      chatId: "chatId",
      name: "Test name",
      remainingSession: 5,
      status: "ACTIVE",
      posts: [],
      files: [
        {
          id: "filePostTestId",
          url: "https://www.youtube.com/",
          creationDate: new Date(),
        },
      ],
      sessions: [],
    });
    expect(
      useCase.execute({ p2pCourse, filePostId: "filePostTestId" })
    ).resolves.toBe(undefined);
    expect(p2pCourse.files.length).toBe(0);
  });
});
