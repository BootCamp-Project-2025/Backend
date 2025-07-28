import "reflect-metadata";
import { StatusCodes } from "http-status-codes";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import UpdateStudentTrackProgressUseCase from "@/contexts/LearningContext/application/useCases/studentTrackProgress/UpdateStudentTrackProgressUseCase";
import { StudentTrackProgress } from "@/contexts/LearningContext/domain/entities/StudentTrackProgress";
import { UniqueEntityID } from "@/contexts/Shared/domain/UniqueEntityID";

const mockTrackRepository = {
  findById: jest.fn(),
  update: jest.fn(),
};

function makeUseCase() {
  return new UpdateStudentTrackProgressUseCase(mockTrackRepository as any);
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

describe("UpdateStudentTrackProgressUseCase", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("debe actualizar si existe el track", async () => {
    mockTrackRepository.findById.mockResolvedValue(fakeTrack);
    mockTrackRepository.update.mockResolvedValue(undefined);

    const useCase = makeUseCase();
    await expect(useCase.execute(fakeTrack)).resolves.toBeUndefined();
    expect(mockTrackRepository.findById).toHaveBeenCalledWith("track1");
    expect(mockTrackRepository.update).toHaveBeenCalledWith(fakeTrack);
  });

  it("debe lanzar ApiError 404 si no existe el track", async () => {
    mockTrackRepository.findById.mockResolvedValue(undefined);

    const useCase = makeUseCase();
    await expect(useCase.execute(fakeTrack)).rejects.toThrow(ApiError);
    expect(mockTrackRepository.update).not.toHaveBeenCalled();
  });

  it("debe propagar ApiError si ocurre en el try", async () => {
    mockTrackRepository.findById.mockImplementation(() => {
      throw new ApiError(StatusCodes.BAD_REQUEST, "bad");
    });
    const useCase = makeUseCase();

    await expect(useCase.execute(fakeTrack)).rejects.toThrow(ApiError);
  });

  it("debe lanzar ApiError 500 si ocurre error desconocido", async () => {
    mockTrackRepository.findById.mockRejectedValue(new Error("fail"));
    const useCase = makeUseCase();

    await expect(useCase.execute(fakeTrack)).rejects.toThrow(ApiError);
  });
});
