import "reflect-metadata";
import { CreateEnrollmentUseCase } from "@/contexts/CoreContext/application/useCases/enrollment/CreateEnrollmentUseCase";
import { IEnrollmentRepository } from "@/contexts/CoreContext/domain/interfaces/repositories/IEnrollmentRepository";
import { ICourseRepository } from "@/contexts/LearningContext/domain/interfaces/ICourseRepository";
import { IUserRepository } from "@/contexts/CoreContext/domain/interfaces/repositories/IUserRepository";
import { Enrollment } from "@/contexts/CoreContext/domain/aggregates/Enrollment";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { StatusCodes } from "http-status-codes";
import { User } from "@/contexts/CoreContext/domain/aggregates/User";
import { Course } from "@/contexts/LearningContext/domain/aggregates/Course";

describe("CreateEnrollmentUseCase", () => {
  let enrollmentRepository: jest.Mocked<IEnrollmentRepository>;
  let courseRepository: jest.Mocked<ICourseRepository>;
  let userRepository: jest.Mocked<IUserRepository>;
  let useCase: CreateEnrollmentUseCase;

  const fakeEnrollment = {
    userId: "user123",
    courseId: "course123",
  } as unknown as Enrollment;

  beforeEach(() => {
    enrollmentRepository = {
      create: jest.fn(),
      isUserEnrolled: jest.fn(),
    } as unknown as jest.Mocked<IEnrollmentRepository>;

    courseRepository = {
      findById: jest.fn(),
    } as unknown as jest.Mocked<ICourseRepository>;

    userRepository = {
      getById: jest.fn(),
    } as unknown as jest.Mocked<IUserRepository>;

    useCase = new CreateEnrollmentUseCase(
      enrollmentRepository,
      courseRepository,
      userRepository
    );
  });

  it("should throw ApiError if user is not found", async () => {
    userRepository.getById.mockResolvedValue(null);

    await expect(useCase.execute(fakeEnrollment)).rejects.toThrow(ApiError);
    await expect(useCase.execute(fakeEnrollment)).rejects.toMatchObject({
      statusCode: StatusCodes.NOT_FOUND,
      message: "User not found",
    });

    expect(userRepository.getById).toHaveBeenCalledWith("user123");
  });

  it("should throw ApiError if user is already enrolled", async () => {
    userRepository.getById.mockResolvedValue({ id: "user123" } as unknown as User);
    courseRepository.findById.mockResolvedValue({ id: "course123" } as unknown as Course);
    enrollmentRepository.isUserEnrolled.mockResolvedValue(true);

    await expect(useCase.execute(fakeEnrollment)).rejects.toThrow(ApiError);
    await expect(useCase.execute(fakeEnrollment)).rejects.toMatchObject({
      statusCode: StatusCodes.CONFLICT,
      message: "User is already enrolled in this course",
    });

    expect(enrollmentRepository.isUserEnrolled).toHaveBeenCalledWith("user123", "course123");
  });

  it("should throw ApiError if course is not found", async () => {
    userRepository.getById.mockResolvedValue({ id: "user123" } as unknown as User);
    courseRepository.findById.mockResolvedValue(null);
    enrollmentRepository.isUserEnrolled.mockResolvedValue(false);

    await expect(useCase.execute(fakeEnrollment)).rejects.toThrow(ApiError);
    await expect(useCase.execute(fakeEnrollment)).rejects.toMatchObject({
      statusCode: StatusCodes.NOT_FOUND,
      message: "Course not found",
    });

    expect(courseRepository.findById).toHaveBeenCalledWith("course123");
  });

  it("should create and return enrollment if user and course exist and not already enrolled", async () => {
    userRepository.getById.mockResolvedValue({ id: "user123" } as unknown as User);
    courseRepository.findById.mockResolvedValue({ id: "course123" } as unknown as Course);
    enrollmentRepository.isUserEnrolled.mockResolvedValue(false);
    enrollmentRepository.create.mockResolvedValue({ id: "enroll1" } as unknown as Enrollment);

    const result = await useCase.execute(fakeEnrollment);

    expect(result).toEqual({ id: "enroll1" });
    expect(enrollmentRepository.create).toHaveBeenCalledWith(fakeEnrollment);
  });
});
