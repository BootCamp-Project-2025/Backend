import "reflect-metadata";
import AddSessionUseCase from "@/contexts/LearningContext/application/useCases/p2pCourse/AddSessionUseCase";
import { P2PCourse } from "@/contexts/LearningContext/domain/aggregates/P2PCourse";
import LiveSession from "@/contexts/LearningContext/domain/entities/LiveSession";
import { ICdnService } from "@/contexts/CoreContext/domain/interfaces/services/ICdnService";
import ILiveSessionRepository from "@/contexts/LearningContext/domain/interfaces/ILiveSessionRepository";

describe("AddSessionUseCase component", () => {
  const sessionRepositoryMock = {
    create: jest.fn(),
    delete: jest.fn(),
    update: jest.fn(),
    completeSession: jest.fn(),
  };

  const useCase = new AddSessionUseCase(sessionRepositoryMock);
  it("Creates correctly", () => {
    expect(useCase).toBeInstanceOf(AddSessionUseCase);
  });

  it("Adds correctly", () => {
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
    const session = LiveSession.createFromPrimitive({
      id: "testSessionId",
      url: "https://www.youtube.com/",
      dateOfTheSession: new Date(),
      creationDate: new Date(),
      status: "COMPLETED",
    });
    sessionRepositoryMock.create.mockResolvedValue(session);
    const useCase = new AddSessionUseCase(sessionRepositoryMock);
    expect(useCase.execute({ p2pCourse, session })).resolves.toBe(session);
    expect(p2pCourse.sessions.length).toBe(1);
  });
});
