import "reflect-metadata";
import { GetUserEnrollmentsUseCase } from "@/contexts/CoreContext/application/useCases/enrollment/GetUserEnrollmentsUseCase";
import { Enrollment } from "@/contexts/CoreContext/domain/aggregates/Enrollment";
import { User } from "@/contexts/CoreContext/domain/aggregates/User";
import { IEnrollmentRepository } from "@/contexts/CoreContext/domain/interfaces/repositories/IEnrollmentRepository";
import { IUserRepository } from "@/contexts/CoreContext/domain/interfaces/repositories/IUserRepository";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { StatusCodes } from "http-status-codes";

const mockEnrollmentRepo = {
  getByUserId: jest.fn(),
} as unknown as jest.Mocked<IEnrollmentRepository>;

const mockUserRepo = {
  getById: jest.fn(),
} as unknown as jest.Mocked<IUserRepository>;

const mockEnrollments: Enrollment[] = [
  { id: "e1" } as unknown as Enrollment,
  { id: "e2" } as unknown as Enrollment,
];

describe("GetUserEnrollmentsUseCase", () => {
  let useCase: GetUserEnrollmentsUseCase;

  beforeEach(() => {
    jest.clearAllMocks();
    useCase = new GetUserEnrollmentsUseCase(mockEnrollmentRepo, mockUserRepo);
  });

  it("should throw ApiError if userId is not provided", async () => {
    await expect(useCase.execute("")).rejects.toThrow(ApiError);
    await expect(useCase.execute("")).rejects.toMatchObject({
      statusCode: StatusCodes.BAD_REQUEST,
      message: "User ID is required.",
    });
  });

  it("should throw ApiError if user does not exist", async () => {
    mockUserRepo.getById.mockResolvedValue(null);

    await expect(useCase.execute("user123")).rejects.toThrow(ApiError);
    await expect(useCase.execute("user123")).rejects.toMatchObject({
      statusCode: StatusCodes.NOT_FOUND,
      message: "User not found.",
    });

    expect(mockUserRepo.getById).toHaveBeenCalledWith("user123");
  });

  it("should return enrollments if user exists", async () => {
    mockUserRepo.getById.mockResolvedValue({
      id: "user123",
    } as unknown as User);

    mockEnrollmentRepo.getByUserId.mockResolvedValue(mockEnrollments);

    const result = await useCase.execute("user123");

    expect(mockUserRepo.getById).toHaveBeenCalledWith("user123");
    expect(mockEnrollmentRepo.getByUserId).toHaveBeenCalledWith("user123");
    expect(result).toEqual(mockEnrollments);
  });

  it("should throw ApiError with 500 if unexpected error occurs", async () => {
    mockUserRepo.getById.mockRejectedValue(new Error("DB connection failed"));

    await expect(useCase.execute("user123")).rejects.toThrow(ApiError);
    await expect(useCase.execute("user123")).rejects.toMatchObject({
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      message: "Error fetching enrollments",
    });
  });
});
