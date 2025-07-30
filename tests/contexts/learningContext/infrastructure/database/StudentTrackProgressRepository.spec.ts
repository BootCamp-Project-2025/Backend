import "reflect-metadata";
import { StatusCodes } from "http-status-codes";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import UpdateStudentTrackProgressUseCase from "@/contexts/LearningContext/application/useCases/studentTrackProgress/UpdateStudentTrackProgressUseCase";
import { StudentTrackProgress } from "@/contexts/LearningContext/domain/entities/StudentTrackProgress";
import { EnrollmentId } from "@/contexts/CoreContext/domain/valueObjects/EnrollmentId";
import { UniqueEntityID } from "@/contexts/Shared/domain/UniqueEntityID";
import { IStudentTrackProgressRepository } from "@/contexts/LearningContext/domain/interfaces/IStudentTrackProgressRepository";
import { Identifier } from "@/contexts/Shared/domain/Identifier";

const mockRepository = {
  findById: jest.fn(),
  update: jest.fn(),
  create: jest.fn(),
  delete: jest.fn(),
  findByEnrollment: jest.fn(),
};

function makeUseCase() {
  return new UpdateStudentTrackProgressUseCase(
    mockRepository as IStudentTrackProgressRepository
  );
}

const fakeEnrollmentId = EnrollmentId.create(new UniqueEntityID("enroll1"));

const fakeProps = {
  enrollmentId: fakeEnrollmentId,
  lessonId: "lesson1",
  videoProgresses: [],
  resourcesCompleted: [],
  completed: false,
  completedAt: undefined,
};

const fakeTrackProgress = StudentTrackProgress.create(
  fakeProps,
  new UniqueEntityID("track1")
);

const existingTrackProgress = StudentTrackProgress.create(
  fakeProps,
  new UniqueEntityID("existing1")
);

describe("UpdateStudentTrackProgressUseCase", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should update StudentTrackProgress successfully when it exists", async () => {
    mockRepository.findById.mockResolvedValue(existingTrackProgress);
    mockRepository.update.mockResolvedValue(undefined);

    const useCase = makeUseCase();
    await useCase.execute(fakeTrackProgress);

    expect(mockRepository.findById).toHaveBeenCalledWith("track1");
    expect(mockRepository.update).toHaveBeenCalledWith(fakeTrackProgress);
    expect(mockRepository.findById).toHaveBeenCalledTimes(1);
    expect(mockRepository.update).toHaveBeenCalledTimes(1);
  });

  it("should throw ApiError 404 if StudentTrackProgress does not exist", async () => {
    mockRepository.findById.mockResolvedValue(null);

    const useCase = makeUseCase();

    await expect(useCase.execute(fakeTrackProgress)).rejects.toThrow(
      new ApiError(StatusCodes.NOT_FOUND, "StudentTrackProgress not found")
    );

    expect(mockRepository.findById).toHaveBeenCalledWith("track1");
    expect(mockRepository.update).not.toHaveBeenCalled();
  });

  it("should throw ApiError 404 if findById returns undefined", async () => {
    mockRepository.findById.mockResolvedValue(undefined);

    const useCase = makeUseCase();

    await expect(useCase.execute(fakeTrackProgress)).rejects.toThrow(
      new ApiError(StatusCodes.NOT_FOUND, "StudentTrackProgress not found")
    );

    expect(mockRepository.findById).toHaveBeenCalledWith("track1");
    expect(mockRepository.update).not.toHaveBeenCalled();
  });

  it("should re-throw ApiError when findById throws ApiError", async () => {
    const apiError = new ApiError(StatusCodes.BAD_REQUEST, "Invalid ID format");
    mockRepository.findById.mockRejectedValue(apiError);

    const useCase = makeUseCase();

    await expect(useCase.execute(fakeTrackProgress)).rejects.toThrow(apiError);

    expect(mockRepository.findById).toHaveBeenCalledWith("track1");
    expect(mockRepository.update).not.toHaveBeenCalled();
  });

  it("should re-throw ApiError when update throws ApiError", async () => {
    const apiError = new ApiError(StatusCodes.CONFLICT, "Update conflict");
    mockRepository.findById.mockResolvedValue(existingTrackProgress);
    mockRepository.update.mockRejectedValue(apiError);

    const useCase = makeUseCase();

    await expect(useCase.execute(fakeTrackProgress)).rejects.toThrow(apiError);

    expect(mockRepository.findById).toHaveBeenCalledWith("track1");
    expect(mockRepository.update).toHaveBeenCalledWith(fakeTrackProgress);
  });

  it("should throw INTERNAL_SERVER_ERROR when findById throws generic error", async () => {
    const genericError = new Error("Database connection failed");
    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});
    mockRepository.findById.mockRejectedValue(genericError);

    const useCase = makeUseCase();

    await expect(useCase.execute(fakeTrackProgress)).rejects.toThrow(
      new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "Error executing the update"
      )
    );

    expect(consoleSpy).toHaveBeenCalledWith(genericError);
    expect(mockRepository.findById).toHaveBeenCalledWith("track1");
    expect(mockRepository.update).not.toHaveBeenCalled();

    consoleSpy.mockRestore();
  });

  it("should throw INTERNAL_SERVER_ERROR when update throws generic error", async () => {
    const genericError = new Error("Database update failed");
    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});
    mockRepository.findById.mockResolvedValue(existingTrackProgress);
    mockRepository.update.mockRejectedValue(genericError);

    const useCase = makeUseCase();

    await expect(useCase.execute(fakeTrackProgress)).rejects.toThrow(
      new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "Error executing the update"
      )
    );

    expect(consoleSpy).toHaveBeenCalledWith(genericError);
    expect(mockRepository.findById).toHaveBeenCalledWith("track1");
    expect(mockRepository.update).toHaveBeenCalledWith(fakeTrackProgress);

    consoleSpy.mockRestore();
  });

  it("should call toString() method on id correctly", async () => {
    const mockId = { toString: jest.fn().mockReturnValue("custom-id-123") };
    const customTrackProgress = StudentTrackProgress.create(
      fakeProps,
      mockId as unknown as UniqueEntityID
    );

    mockRepository.findById.mockResolvedValue(existingTrackProgress);
    mockRepository.update.mockResolvedValue(undefined);

    const useCase = makeUseCase();
    await useCase.execute(customTrackProgress);

    expect(mockId.toString).toHaveBeenCalledTimes(1);
    expect(mockRepository.findById).toHaveBeenCalledWith("custom-id-123");
  });
});
