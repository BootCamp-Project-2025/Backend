import "reflect-metadata";
import { StatusCodes } from "http-status-codes";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import UpdateStudentTrackProgressUseCase from "@/contexts/LearningContext/application/useCases/studentTrackProgress/UpdateStudentTrackProgressUseCase";
import { StudentTrackProgress } from "@/contexts/LearningContext/domain/entities/StudentTrackProgress";
import { UniqueEntityID } from "@/contexts/Shared/domain/UniqueEntityID";

const mockRepository = {
  findById: jest.fn(),
  update: jest.fn(),
  create: jest.fn(),
  delete: jest.fn(),
  findByEnrollment: jest.fn(),
};

function makeUseCase() {
  return new UpdateStudentTrackProgressUseCase(mockRepository as any);
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

  it("Should update StudentTrackProgress when exists", async () => {
    mockRepository.findById.mockResolvedValue(existingTrackProgress);
    mockRepository.update.mockResolvedValue(undefined);

    const useCase = makeUseCase();
    await useCase.execute(fakeTrackProgress);

    expect(mockRepository.findById).toHaveBeenCalledWith("track1");
    expect(mockRepository.update).toHaveBeenCalledWith(fakeTrackProgress);
  });

  it("Should throw ApiError 404 if StudentTrackProgress doesn't exist", async () => {
    mockRepository.findById.mockResolvedValue(null);

    const useCase = makeUseCase();

    await expect(useCase.execute(fakeTrackProgress)).rejects.toThrow(
      new ApiError(StatusCodes.NOT_FOUND, "StudentTrackProgress not found")
    );

    expect(mockRepository.findById).toHaveBeenCalledWith("track1");
    expect(mockRepository.update).not.toHaveBeenCalled();
  });

  it("Should throw ApiError 404 weather findById returns undefined", async () => {
    mockRepository.findById.mockResolvedValue(undefined);

    const useCase = makeUseCase();

    await expect(useCase.execute(fakeTrackProgress)).rejects.toThrow(
      new ApiError(StatusCodes.NOT_FOUND, "StudentTrackProgress not found")
    );

    expect(mockRepository.findById).toHaveBeenCalledWith("track1");
    expect(mockRepository.update).not.toHaveBeenCalled();
  });

  it("Should throw ApiError when findById throw ApiError", async () => {
    const apiError = new ApiError(StatusCodes.BAD_REQUEST, "Invalid ID format");
    mockRepository.findById.mockRejectedValue(apiError);

    const useCase = makeUseCase();

    await expect(useCase.execute(fakeTrackProgress)).rejects.toThrow(apiError);

    expect(mockRepository.findById).toHaveBeenCalledWith("track1");
    expect(mockRepository.update).not.toHaveBeenCalled();
  });

  it("Should throw ApiError when update throw ApiError", async () => {
    const apiError = new ApiError(StatusCodes.CONFLICT, "Update conflict");
    mockRepository.findById.mockResolvedValue(existingTrackProgress);
    mockRepository.update.mockRejectedValue(apiError);

    const useCase = makeUseCase();

    await expect(useCase.execute(fakeTrackProgress)).rejects.toThrow(apiError);

    expect(mockRepository.findById).toHaveBeenCalledWith("track1");
    expect(mockRepository.update).toHaveBeenCalledWith(fakeTrackProgress);
  });

  /*     it("debe lanzar INTERNAL_SERVER_ERROR cuando findById lanza error genérico", async () => {
            const genericError = new Error("Database connection failed");
            const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => { });
            mockRepository.findById.mockRejectedValue(genericError);
    
            const useCase = makeUseCase();
    
            await expect(useCase.execute(fakeTrackProgress)).rejects.toThrow(
                new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "Error executing the update")
            );
    
            expect(consoleSpy).toHaveBeenCalledWith(genericError);
            expect(mockRepository.findById).toHaveBeenCalledWith("track1");
            expect(mockRepository.update).not.toHaveBeenCalled();
    
            consoleSpy.mockRestore();
        });
    
        it("debe lanzar INTERNAL_SERVER_ERROR cuando update lanza error genérico", async () => {
            const genericError = new Error("Database update failed");
            const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => { });
            mockRepository.findById.mockResolvedValue(existingTrackProgress);
            mockRepository.update.mockRejectedValue(genericError);
    
            const useCase = makeUseCase();
    
            await expect(useCase.execute(fakeTrackProgress)).rejects.toThrow(
                new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "Error executing the update")
            );
    
            expect(consoleSpy).toHaveBeenCalledWith(genericError);
            expect(mockRepository.findById).toHaveBeenCalledWith("track1");
            expect(mockRepository.update).toHaveBeenCalledWith(fakeTrackProgress);
    
            consoleSpy.mockRestore();
        });
    
        it("debe llamar al método toString() del id correctamente", async () => {
            const mockId = { toString: jest.fn().mockReturnValue("custom-id-123") };
            const customTrackProgress = StudentTrackProgress.create(
                fakeProps,
                mockId as any
            );
    
            mockRepository.findById.mockResolvedValue(existingTrackProgress);
            mockRepository.update.mockResolvedValue(undefined);
    
            const useCase = makeUseCase();
            await useCase.execute(customTrackProgress);
    
            expect(mockId.toString).toHaveBeenCalledTimes(1);
            expect(mockRepository.findById).toHaveBeenCalledWith("custom-id-123");
        }); */
});
