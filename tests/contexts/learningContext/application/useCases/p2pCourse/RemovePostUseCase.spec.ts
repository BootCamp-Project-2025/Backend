import "reflect-metadata";

import { P2PCourse } from "@/contexts/LearningContext/domain/aggregates/P2PCourse";
import RemovePostUseCase from "@/contexts/LearningContext/application/useCases/p2pCourse/RemovePostUseCase";

describe("RemovePostUseCase component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const postRepositoryMock = {
    create: jest.fn(),
    delete: jest.fn(),
    update: jest.fn(),
  };
  const useCase = new RemovePostUseCase(postRepositoryMock);
  it("Creates correctly", () => {
    expect(useCase).toBeInstanceOf(RemovePostUseCase);
  });

  it("Removes correctly", () => {
    const p2pCourse = P2PCourse.createFromPrimitive({
      studentId: "studentId",
      teacherId: "teacherId",
      chatId: "chatId",
      name: "Test name",
      remainingSession: 5,
      status: "ACTIVE",
      posts: [
        {
          id: "postTestId",
          title: "Test title",
          description: "Test description",
          creationDate: new Date(),
        },
      ],
      files: [],
      sessions: [],
    });
    expect(useCase.execute({ p2pCourse, postId: "postTestId" })).resolves.toBe(
      undefined
    );
    expect(p2pCourse.files.length).toBe(0);
  });
});
