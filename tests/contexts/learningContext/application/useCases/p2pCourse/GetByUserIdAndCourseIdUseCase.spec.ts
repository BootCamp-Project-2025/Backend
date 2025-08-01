import "reflect-metadata";
import GetByTeacherIdAndCourseIdUseCase from "@/contexts/LearningContext/application/useCases/p2pCourse/GetByUserIdAndCourseIdUseCase";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { P2PCourse } from "@/contexts/LearningContext/domain/aggregates/P2PCourse";

describe("GetByTeacherIdAndCourseIdUseCase component", () => {
  const p2pCourseRepositoryMock = {
    create: jest.fn(),
    findById: jest.fn(),
    findByTeacherIdAndCourseId: jest.fn(),
  };
  it("Creates correctly", () => {
    const useCase = new GetByTeacherIdAndCourseIdUseCase(
      p2pCourseRepositoryMock
    );
    expect(useCase).toBeInstanceOf(GetByTeacherIdAndCourseIdUseCase);
  });

  it("Throws error if there is no course found", async () => {
    const useCase = new GetByTeacherIdAndCourseIdUseCase(
      p2pCourseRepositoryMock
    );
    p2pCourseRepositoryMock.findByTeacherIdAndCourseId.mockResolvedValue(null);
    expect(
      useCase.execute({ p2pCourseId: "p2pCourseTestId", userId: "userTestId" })
    ).rejects.toThrow(ApiError);
  });

  it("Return a course if its found", async () => {
    const useCase = new GetByTeacherIdAndCourseIdUseCase(
      p2pCourseRepositoryMock
    );
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
    p2pCourseRepositoryMock.findByTeacherIdAndCourseId.mockResolvedValue(
      p2pCourse
    );
    expect(
      useCase.execute({ p2pCourseId: "p2pCourseTestId", userId: "userTestId" })
    ).resolves.toBe(p2pCourse);
  });
});
