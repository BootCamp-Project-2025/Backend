import "reflect-metadata";

import { P2PCourse } from "@/contexts/LearningContext/domain/aggregates/P2PCourse";
import RemoveSessionUseCase from "@/contexts/LearningContext/application/useCases/p2pCourse/RemoveSessionUseCase";

describe("RemoveSessionUseCase component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const postSessionMock = {
    create: jest.fn(),
    delete: jest.fn(),
    update: jest.fn(),
    completeSession: jest.fn(),
  };
  const useCase = new RemoveSessionUseCase(postSessionMock);
  it("Creates correctly", () => {
    expect(useCase).toBeInstanceOf(RemoveSessionUseCase);
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
      files: [],
      sessions: [
        {
          id: "testSessionId",
          url: "https://www.youtube.com/",
          dateOfTheSession: new Date(),
          creationDate: new Date(),
          status: "PENDING",
        },
      ],
    });
    expect(
      useCase.execute({ p2pCourse, sessionId: "testSessionId" })
    ).resolves.toBe(undefined);
    expect(p2pCourse.files.length).toBe(0);
  });
});
