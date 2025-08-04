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
import { Module } from "@/contexts/LearningContext/domain/entities/Module";
import { StudentTrackProgress } from "@/contexts/LearningContext/domain/entities/StudentTrackProgress";
import IUseCase from "@/contexts/LearningContext/domain/interfaces/IUseCase";

describe("CreateEnrollmentUseCase", () => {
  let enrollmentRepository: jest.Mocked<IEnrollmentRepository>;
  let courseRepository: jest.Mocked<ICourseRepository>;
  let userRepository: jest.Mocked<IUserRepository>;
  let getAllModulesUseCase: jest.Mocked<IUseCase<string, Module[]>>;
  let createStudentTrackProgressUseCase: jest.Mocked<
    IUseCase<
      { trackProgress: StudentTrackProgress; enrollmentId: string },
      void
    >
  >;
  let useCase: CreateEnrollmentUseCase;

  const fakeEnrollment = {
    id: "enroll1",
    userId: { toString: () => "user123" },
    courseId: { toString: () => "course123" },
    status: "ENROLLED",
  } as unknown as Enrollment;

  beforeEach(() => {
    enrollmentRepository = {
      findValidEnrollment: jest.fn(),
      reactivateEnrollment: jest.fn(),
      create: jest.fn(),
    } as unknown as jest.Mocked<IEnrollmentRepository>;

    courseRepository = {
      findById: jest.fn(),
    } as unknown as jest.Mocked<ICourseRepository>;

    userRepository = {
      getById: jest.fn(),
    } as unknown as jest.Mocked<IUserRepository>;

    getAllModulesUseCase = {
      execute: jest.fn().mockResolvedValue([]),
    } as unknown as jest.Mocked<IUseCase<string, Module[]>>;

    createStudentTrackProgressUseCase = {
      execute: jest.fn().mockResolvedValue(undefined),
    } as unknown as jest.Mocked<
      IUseCase<
        { trackProgress: StudentTrackProgress; enrollmentId: string },
        void
      >
    >;

    useCase = new CreateEnrollmentUseCase(
      enrollmentRepository,
      courseRepository,
      userRepository,
      getAllModulesUseCase,
      createStudentTrackProgressUseCase
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

  it("should throw ApiError if course is not found", async () => {
    userRepository.getById.mockResolvedValue({
      id: "user123",
    } as unknown as User);
    courseRepository.findById.mockResolvedValue(null);
    enrollmentRepository.findValidEnrollment.mockResolvedValue(null);

    await expect(useCase.execute(fakeEnrollment)).rejects.toThrow(ApiError);
    await expect(useCase.execute(fakeEnrollment)).rejects.toMatchObject({
      statusCode: StatusCodes.NOT_FOUND,
      message: "Course not found",
    });

    expect(courseRepository.findById).toHaveBeenCalledWith("course123");
  });

  it("should reactivate enrollment if existing enrollment is canceled", async () => {
    userRepository.getById.mockResolvedValue({
      id: "user123",
    } as unknown as User);
    courseRepository.findById.mockResolvedValue({
      id: "course123",
    } as unknown as Course);

    const canceledEnrollment = {
      id: "enroll1",
      status: "CANCELED",
    } as unknown as Enrollment;

    enrollmentRepository.findValidEnrollment.mockResolvedValue(
      canceledEnrollment
    );
    enrollmentRepository.reactivateEnrollment.mockResolvedValue({
      id: "enroll1",
      status: "ENROLLED",
    } as unknown as Enrollment);

    const result = await useCase.execute(fakeEnrollment);

    expect(enrollmentRepository.reactivateEnrollment).toHaveBeenCalledWith(
      "enroll1"
    );
    expect(result).toEqual({
      id: "enroll1",
      status: "ENROLLED",
    });
  });

  it("should throw ApiError if user is already enrolled", async () => {
    userRepository.getById.mockResolvedValue({
      id: "user123",
    } as unknown as User);
    courseRepository.findById.mockResolvedValue({
      id: "course123",
    } as unknown as Course);

    const existingEnrollment = {
      id: "enroll1",
      status: "ENROLLED",
    } as unknown as Enrollment;

    enrollmentRepository.findValidEnrollment.mockResolvedValue(
      existingEnrollment
    );

    await expect(useCase.execute(fakeEnrollment)).rejects.toThrow(ApiError);
    await expect(useCase.execute(fakeEnrollment)).rejects.toMatchObject({
      statusCode: StatusCodes.CONFLICT,
      message: "User is already enrolled in this course",
    });

    expect(enrollmentRepository.findValidEnrollment).toHaveBeenCalledWith(
      "user123",
      "course123"
    );
  });

  it("should create and return enrollment if user and course exist and no existing enrollment", async () => {
    userRepository.getById.mockResolvedValue({
      id: "user123",
    } as unknown as User);
    courseRepository.findById.mockResolvedValue({
      id: "course123",
    } as unknown as Course);
    enrollmentRepository.findValidEnrollment.mockResolvedValue(null);

    enrollmentRepository.create.mockResolvedValue({
      id: "enroll1",
      courseId: {
        toString: () => "course123",
      },
    } as unknown as Enrollment);

    getAllModulesUseCase.execute.mockResolvedValue([]);

    const result = await useCase.execute(fakeEnrollment);

    expect(result.id).toBe("enroll1");
    expect(result.courseId).toEqual({ toString: expect.any(Function) });
    expect(enrollmentRepository.create).toHaveBeenCalledWith(fakeEnrollment);
  });
});
