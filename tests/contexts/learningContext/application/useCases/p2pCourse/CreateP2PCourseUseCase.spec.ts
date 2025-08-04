import "reflect-metadata";
import { P2PCourse } from "@/contexts/LearningContext/domain/aggregates/P2PCourse";
import CreateP2PCourseUseCase from "@/contexts/LearningContext/application/useCases/p2pCourse/CreateP2PCourseUseCase";
import IP2PCourseRepository from "@/contexts/LearningContext/domain/interfaces/IP2PCourseRepository";

describe("CreateP2PCourseUseCase component", () => {
  const p2pCourseRepositoryMock = {
    create: jest.fn(),
    findById: jest.fn(),
    findByUserIdAndCourseId: jest.fn(),
  };
  it("Creates correctly", () => {
    const useCase = new CreateP2PCourseUseCase(p2pCourseRepositoryMock);
    expect(useCase).toBeInstanceOf(CreateP2PCourseUseCase);
  });

  it("Creates a new p2p course correctly", async () => {
    const useCase = new CreateP2PCourseUseCase(p2pCourseRepositoryMock);
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
    p2pCourseRepositoryMock.create.mockResolvedValue(p2pCourse);
    expect(useCase.execute(p2pCourse)).resolves.toBe(p2pCourse);
  });
});
