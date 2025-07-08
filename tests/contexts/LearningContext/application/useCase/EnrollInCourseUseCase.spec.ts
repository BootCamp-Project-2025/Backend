import "reflect-metadata";
import { User } from "@/contexts/CoreContext/domain/aggregates/User";
import { IUserRepository } from "@/contexts/CoreContext/domain/interfaces/repositories/IUserRepository";
import { EnrollInCourseUseCase } from "@/contexts/LearningContext/application/useCases/EnrollInCourseUseCase";
import { Course } from "@/contexts/LearningContext/domain/aggregates/Course";
import { ICourseRepository } from "@/contexts/LearningContext/domain/interfaces/ICourseRepository";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { StatusCodes } from "http-status-codes";

describe("EnrollInCourseUseCase", () => {
  let courseRepository: jest.Mocked<ICourseRepository>;
  let userRepository: jest.Mocked<IUserRepository>;
  let useCase: EnrollInCourseUseCase;

  const courseId = "course-1";
  const userId = "user-1";
  const course = { id: courseId } as unknown as Course;
  const user = { id: userId } as unknown as User;

  beforeEach(() => {
    courseRepository = {
      findById: jest.fn(),
      findAll: jest.fn(),
      insert: jest.fn(),
      isUserEnrolled: jest.fn(),
      enrollInCourse: jest.fn(),
    };
    userRepository = {
      getById: jest.fn(),
      addFreelancerProfile: jest.fn(),
      getUserProfileById: jest.fn(),
      getAll: jest.fn(),
      delete: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    };
    useCase = new EnrollInCourseUseCase(courseRepository, userRepository);
  });

  it("enrolls user in course if not already enrolled", async () => {
    courseRepository.findById.mockResolvedValue(course);
    userRepository.getById.mockResolvedValue(user);
    courseRepository.isUserEnrolled.mockResolvedValue(false);

    await useCase.execute({ courseId, userId });

    expect(courseRepository.findById).toHaveBeenCalledWith(courseId);
    expect(userRepository.getById).toHaveBeenCalledWith(userId);
    expect(courseRepository.isUserEnrolled).toHaveBeenCalledWith(
      courseId,
      userId
    );
    expect(courseRepository.enrollInCourse).toHaveBeenCalledWith(course, user);
  });

  it("throws NOT_FOUND if course does not exist", async () => {
    courseRepository.findById.mockResolvedValue(null);

    await expect(useCase.execute({ courseId, userId })).rejects.toThrow(
      ApiError
    );
    await expect(useCase.execute({ courseId, userId })).rejects.toMatchObject({
      statusCode: StatusCodes.NOT_FOUND,
      message: "Course not found",
    });
    expect(courseRepository.findById).toHaveBeenCalledWith(courseId);
  });

  it("throws NOT_FOUND if user does not exist", async () => {
    courseRepository.findById.mockResolvedValue(course);
    userRepository.getById.mockResolvedValue(null);

    await expect(useCase.execute({ courseId, userId })).rejects.toThrow(
      ApiError
    );
    await expect(useCase.execute({ courseId, userId })).rejects.toMatchObject({
      statusCode: StatusCodes.NOT_FOUND,
      message: "User not found",
    });
    expect(userRepository.getById).toHaveBeenCalledWith(userId);
  });

  it("throws CONFLICT if user is already enrolled", async () => {
    courseRepository.findById.mockResolvedValue(course);
    userRepository.getById.mockResolvedValue(user);
    courseRepository.isUserEnrolled.mockResolvedValue(true);

    await expect(useCase.execute({ courseId, userId })).rejects.toThrow(
      ApiError
    );
    await expect(useCase.execute({ courseId, userId })).rejects.toMatchObject({
      statusCode: StatusCodes.CONFLICT,
      message: "User is already enrolled",
    });
    expect(courseRepository.isUserEnrolled).toHaveBeenCalledWith(
      courseId,
      userId
    );
  });
});
