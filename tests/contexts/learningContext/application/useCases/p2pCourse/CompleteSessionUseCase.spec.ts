import "reflect-metadata";

import CompleteSessionUseCase from "@/contexts/LearningContext/application/useCases/p2pCourse/CompleteSessionUseCase";
import { P2PCourse } from "@/contexts/LearningContext/domain/aggregates/P2PCourse";
import LiveSession from "@/contexts/LearningContext/domain/entities/LiveSession";

describe("CompleteSessionUseCase component", () => {
  const sessionRepositoryMock = {
    create: jest.fn(),
    delete: jest.fn(),
    update: jest.fn(),
    completeSession: jest.fn(),
  };

  const useCase = new CompleteSessionUseCase(sessionRepositoryMock);
  it("Creates correctly", () => {
    expect(useCase).toBeInstanceOf(CompleteSessionUseCase);
  });
  it("Calls correctly", () => {
    const p2pCourse = P2PCourse.createFromPrimitive({
      studentId: "studentId",
      teacherId: "teacherId",
      chatId: "chatId",
      name: "Test Name",
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
    const session = LiveSession.createFromPrimitive({
      id: "testSessionId",
      url: "https://www.youtube.com/",
      dateOfTheSession: new Date(),
      creationDate: new Date(),
      status: "COMPLETED",
    });
    sessionRepositoryMock.completeSession.mockResolvedValue(session);
    const useCase = new CompleteSessionUseCase(sessionRepositoryMock);
    expect(
      useCase.execute({ p2pCourse, sessionId: "testSessionId" })
    ).resolves.toBe(session);
  });
});
