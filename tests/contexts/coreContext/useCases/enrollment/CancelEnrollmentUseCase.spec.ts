import "reflect-metadata";
import { IEnrollmentRepository } from "@/contexts/CoreContext/domain/interfaces/repositories/IEnrollmentRepository";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { StatusCodes } from "http-status-codes";
import { Enrollment } from "@/contexts/CoreContext/domain/aggregates/Enrollment";
import { CancelEnrollmentUseCase } from "@/contexts/CoreContext/application/useCases/enrollment/CancelEnrollmenetUseCase";

describe("CancelEnrollmentUseCase", () => {
  let enrollmentRepository: jest.Mocked<IEnrollmentRepository>;
  let useCase: CancelEnrollmentUseCase;

  beforeEach(() => {
    enrollmentRepository = {
      findById: jest.fn(),
      cancelEnrollment: jest.fn(),
    } as unknown as jest.Mocked<IEnrollmentRepository>;

    useCase = new CancelEnrollmentUseCase(enrollmentRepository);
  });

  it("should instantiate with provided repository", () => {
    expect(useCase["enrollmentRepository"]).toBe(enrollmentRepository);
  });

  it("should throw ApiError if enrollment is not found", async () => {
    enrollmentRepository.findById.mockResolvedValue(null as unknown as Enrollment);

    await expect(
      useCase.execute({ enrollmentId: "enroll123" })
    ).rejects.toThrowError(ApiError);

    await expect(
      useCase.execute({ enrollmentId: "enroll123" })
    ).rejects.toMatchObject({
      statusCode: StatusCodes.NOT_FOUND,
      message: "Enrollment not found",
    });

    expect(enrollmentRepository.findById).toHaveBeenCalledWith("enroll123");
  });

  it("should call cancel on enrollment and repository", async () => {
    const mockEnrollment = {
      cancel: jest.fn(),
    } as unknown as Enrollment;

    enrollmentRepository.findById.mockResolvedValue(mockEnrollment);

    await useCase.execute({ enrollmentId: "enroll123" });

    expect(mockEnrollment.cancel).toHaveBeenCalled();
    expect(enrollmentRepository.cancelEnrollment).toHaveBeenCalledWith(mockEnrollment);
  });
});
