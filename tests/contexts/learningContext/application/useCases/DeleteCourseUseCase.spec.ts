import "reflect-metadata";
import { DeleteCourseUseCase } from "@/contexts/LearningContext/application/useCases/DeleteCourseUseCase";
import { ICourseRepository } from "@/contexts/LearningContext/domain/interfaces/ICourseRepository";
import {
  Course,
  CourseProps,
} from "@/contexts/LearningContext/domain/aggregates/Course";
import { CourseName } from "@/contexts/LearningContext/domain/valueObjects/CourseName";
import { CourseDescription } from "@/contexts/LearningContext/domain/valueObjects/CourseDescription";
import { UniqueEntityID } from "@/contexts/Shared/domain/UniqueEntityID";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";

const mockRepository: jest.Mocked<ICourseRepository> = {
  delete: jest.fn(),
  findById: jest.fn(),
} as any;

const empyCourseProps: CourseProps = {
  name: CourseName.create({ name: "name" }),
  description: CourseDescription.create({ description: "course" }),
  imgSrc: "dsadsa",
};

const useCase = new DeleteCourseUseCase(mockRepository);

beforeEach(() => {
  jest.clearAllMocks();
});

describe("DeleteCourseUseCase", () => {
  it("exist", () => {
    expect(DeleteCourseUseCase).toBeDefined;
  });

  it("deletes correctly", () => {
    const course = Course.create(
      empyCourseProps,
      new UniqueEntityID("de12ef32r3r33r")
    );
    mockRepository.findById.mockResolvedValue(course);
    mockRepository.delete.mockResolvedValue();

    expect(async () => await useCase.execute("de12ef32r3r33r")).resolves;
  });
  it("course not found", () => {
    mockRepository.findById.mockResolvedValue(null);
    mockRepository.delete.mockResolvedValue();

    expect(async () => await useCase.execute("de12ef32r3r33r")).rejects.toThrow(
      ApiError
    );
  });
});
