import "reflect-metadata";
import { StatusCodes } from "http-status-codes";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import CreateStudentTrackProgressUseCase from "@/contexts/LearningContext/application/useCases/studentTrackProgress/CreateStudentTrackProgressUseCase";
import { StudentTrackProgress } from "@/contexts/LearningContext/domain/entities/StudentTrackProgress";
import { IStudentTrackProgressRepository } from "@/contexts/LearningContext/domain/interfaces/IStudentTrackProgressRepository";
import { IEnrollmentRepository } from "@/contexts/CoreContext/domain/interfaces/repositories/IEnrollmentRepository";
import { Enrollment } from "@/contexts/CoreContext/domain/aggregates/Enrollment";

const fakeEnrollment = {
  id: "enroll1",
  userId: "user1",
  courseId: "course1",
  orderedAt: new Date(),
  canceledAt: null,
  completedAt: null,
  isActive: () => true,
  isCanceled: () => false,
  isCompleted: () => false,
  cancel: jest.fn(),
  complete: jest.fn(),
} as unknown as Enrollment;

const fakeTrackProgress = {} as StudentTrackProgress;

const mockTrackRepository: jest.Mocked<IStudentTrackProgressRepository> = {
  findById: jest.fn(),
  update: jest.fn(),
  create: jest.fn(),
  delete: jest.fn(),
  findByEnrollment: jest.fn(),
};

const mockEnrollmentRepository: jest.Mocked<IEnrollmentRepository> = {
  findById: jest.fn(),
  cancelEnrollment: jest.fn(),
  create: jest.fn(),
  findValidEnrollment: jest.fn(),
  getByUserId: jest.fn(),
  reactivateEnrollment: jest.fn(),
};

function makeUseCase() {
  return new CreateStudentTrackProgressUseCase(
    mockTrackRepository,
    mockEnrollmentRepository
  );
}

describe("CreateStudentTrackProgressUseCase", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("crea el progreso si encuentra el enrollment", async () => {
    mockEnrollmentRepository.findById.mockResolvedValue(fakeEnrollment);
    mockTrackRepository.create.mockResolvedValue(undefined);

    const useCase = makeUseCase();

    await expect(
      useCase.execute({
        trackProgress: fakeTrackProgress,
        enrollmentId: "enroll1",
      })
    ).resolves.toBeUndefined();

    expect(mockEnrollmentRepository.findById).toHaveBeenCalledWith("enroll1");
    expect(mockTrackRepository.create).toHaveBeenCalledWith(fakeTrackProgress);
  });

  it("lanza ApiError si no existe el enrollment", async () => {
    mockEnrollmentRepository.findById.mockResolvedValue(
      undefined as unknown as Enrollment
    );

    const useCase = makeUseCase();

    await expect(
      useCase.execute({
        trackProgress: fakeTrackProgress,
        enrollmentId: "enroll1",
      })
    ).rejects.toThrow(ApiError);

    expect(mockTrackRepository.create).not.toHaveBeenCalled();
  });

  it("propaga ApiError si ocurre dentro del try", async () => {
    mockEnrollmentRepository.findById.mockImplementation(() => {
      throw new ApiError(StatusCodes.BAD_REQUEST, "bad");
    });

    const useCase = makeUseCase();

    await expect(
      useCase.execute({
        trackProgress: fakeTrackProgress,
        enrollmentId: "enroll1",
      })
    ).rejects.toThrow(ApiError);
  });

  it("lanza ApiError 500 si ocurre error desconocido", async () => {
    mockEnrollmentRepository.findById.mockRejectedValue(new Error("fail"));

    const useCase = makeUseCase();

    await expect(
      useCase.execute({
        trackProgress: fakeTrackProgress,
        enrollmentId: "enroll1",
      })
    ).rejects.toThrow(ApiError);
  });
});
