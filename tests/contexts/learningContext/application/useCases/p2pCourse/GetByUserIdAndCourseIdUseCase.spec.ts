import "reflect-metadata";
import GetByUserIdAndCourseIdUseCase from "@/contexts/LearningContext/application/useCases/p2pCourse/GetByUserIdAndCourseIdUseCase";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { P2PCourse } from "@/contexts/LearningContext/domain/aggregates/P2PCourse";

describe("GetByUserIdAndCourseIdUseCase component", () => {
  const p2pCourseRepositoryMock = {
    create: jest.fn(),
    findById: jest.fn(),
    findByUserIdAndCourseId: jest.fn(),
  };
  it("Creates correctly", () => {
    const useCase = new GetByUserIdAndCourseIdUseCase(p2pCourseRepositoryMock);
    expect(useCase).toBeInstanceOf(GetByUserIdAndCourseIdUseCase);
  });

  it("Throws error if there is no course found", async () => {
    const useCase = new GetByUserIdAndCourseIdUseCase(p2pCourseRepositoryMock);
    p2pCourseRepositoryMock.findByUserIdAndCourseId.mockResolvedValue(null);
    expect(
      useCase.execute({ p2pCourseId: "p2pCourseTestId", userId: "userTestId" })
    ).rejects.toThrow(ApiError);
  });

  it("Return a course if its found", async () => {
    const useCase = new GetByUserIdAndCourseIdUseCase(p2pCourseRepositoryMock);
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
    p2pCourseRepositoryMock.findByUserIdAndCourseId.mockResolvedValue(
      p2pCourse
    );
    expect(
      useCase.execute({ p2pCourseId: "p2pCourseTestId", userId: "userTestId" })
    ).resolves.toBe(p2pCourse);
  });
});
