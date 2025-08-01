import "reflect-metadata";
import AddSessionUseCase from "@/contexts/LearningContext/application/useCases/p2pCourse/AddSessionUseCase";
import { P2PCourse } from "@/contexts/LearningContext/domain/aggregates/P2PCourse";
import LiveSession from "@/contexts/LearningContext/domain/entities/LiveSession";
import EditSessionUseCase from "@/contexts/LearningContext/application/useCases/p2pCourse/EditSessionUseCase";

describe("AddSessionUseCase component", () => {
  const sessionRepositoryMock = {
    create: jest.fn(),
    delete: jest.fn(),
    update: jest.fn(),
  };

  const useCase = new EditSessionUseCase(sessionRepositoryMock);
  it("Creates correctly", () => {
    expect(useCase).toBeInstanceOf(EditSessionUseCase);
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
      sessions: [
        {
          id: "testSessionId",
          url: "https://www.youtube.com/",
          dateOfTheSession: new Date(),
          creationDate: new Date(),
          status: "COMPLETED",
        },
      ],
    });
    const session = LiveSession.createFromPrimitive(
      {
        url: "https://www.youtube.com/",
        dateOfTheSession: new Date("07/05/2025"),
        creationDate: new Date(),
        status: "COMPLETED",
      },
      "testSessionId"
    );
    sessionRepositoryMock.update.mockResolvedValue(session);
    const useCase = new EditSessionUseCase(sessionRepositoryMock);
    expect(useCase.execute({ p2pCourse, session })).resolves.toBe(session);
    expect(p2pCourse.sessions[0]).toBe(session);
  });
});
