import "reflect-metadata";
import { StatusCodes } from "http-status-codes";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import GetStudentTrackProgressByIdUseCase from "@/contexts/LearningContext/application/useCases/studentTrackProgress/GetStudentTrackProgressByIdUseCase";
import { StudentTrackProgress } from "@/contexts/LearningContext/domain/entities/StudentTrackProgress";
import { UniqueEntityID } from "@/contexts/Shared/domain/UniqueEntityID";

const mockRepository = {
  findById: jest.fn(),
};

function makeUseCase() {
  return new GetStudentTrackProgressByIdUseCase(mockRepository as any);
}

const fakeEnrollmentId = { toString: () => "enroll1" } as any;

const fakeProps = {
  enrollmentId: fakeEnrollmentId,
  lessonId: "lesson1",
  videoProgresses: [],
  resourcesCompleted: [],
  completed: false,
  completedAt: undefined,
};

const fakeTrack = StudentTrackProgress.create(
  fakeProps,
  new UniqueEntityID("track1")
);

describe("GetStudentTrackProgressByIdUseCase", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("debe devolver el StudentTrackProgress si existe", async () => {
    mockRepository.findById.mockResolvedValue(fakeTrack);

    const useCase = makeUseCase();
    const result = await useCase.execute("track1");
    expect(result).toBe(fakeTrack);
    expect(mockRepository.findById).toHaveBeenCalledWith("track1");
  });

  it("debe lanzar ApiError 404 si no existe", async () => {
    mockRepository.findById.mockResolvedValue(null);

    const useCase = makeUseCase();
    await expect(useCase.execute("track1")).rejects.toThrow(ApiError);
    expect(mockRepository.findById).toHaveBeenCalledWith("track1");
  });
});
