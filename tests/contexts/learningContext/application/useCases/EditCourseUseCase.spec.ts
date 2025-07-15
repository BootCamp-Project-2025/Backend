import "reflect-metadata";
import { EditCourseUseCase } from "@/contexts/LearningContext/application/useCases/EditCourseUseCase";
import { ICourseRepository } from "@/contexts/LearningContext/domain/interfaces/ICourseRepository";
import {
  Course,
  CourseProps,
} from "@/contexts/LearningContext/domain/aggregates/Course";
import { CourseDescription } from "@/contexts/LearningContext/domain/valueObjects/CourseDescription";
import { CourseName } from "@/contexts/LearningContext/domain/valueObjects/CourseName";
import { CourseDTO } from "@/contexts/LearningContext/domain/dtos/CourseDTO";
import { UniqueEntityID } from "@/contexts/Shared/domain/UniqueEntityID";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { UserId } from "@/contexts/CoreContext/domain/valueObjects/UserId";

const mockRepository: jest.Mocked<ICourseRepository> = {
  update: jest.fn(),
  findById: jest.fn(),
} as any;

const empyCourseProps: CourseProps = {
  name: CourseName.create({ name: "name" }),
  description: CourseDescription.create({ description: "course" }),
  imgSrc: "dsadsa",
  userId: UserId.create(new UniqueEntityID("asdasd")),
};

const useCase = new EditCourseUseCase(mockRepository);

beforeEach(() => {
  jest.clearAllMocks();
});

describe("EditCourseUseCase", () => {
  it("exist", () => {
    expect(EditCourseUseCase).toBeDefined;
  });
  it("edits correctly", () => {
    const course = Course.create(
      empyCourseProps,
      new UniqueEntityID("de12ef32r3r33r")
    );
    mockRepository.findById.mockResolvedValue(course);
    mockRepository.update.mockResolvedValue(course);
    const dto: CourseDTO = {
      name: "name",
      description: "description",
      imgSrc: "imgSrc",
      userId: "userId",
    };
    expect(async () => await useCase.execute(dto)).resolves;
  });

  it("id not passed", () => {
    const course = Course.create(
      empyCourseProps,
      new UniqueEntityID("de12ef32r3r33r")
    );
    const dto: CourseDTO = {
      id: undefined,
      name: "name",
      description: "description",
      imgSrc: "imgSrc",
      userId: "userId",
    };
    expect(async () => await useCase.execute(dto)).rejects.toThrow(ApiError);
  });

  it("course not found", () => {
    const course = Course.create(
      empyCourseProps,
      new UniqueEntityID("de12ef32r3r33r")
    );
    mockRepository.findById.mockResolvedValue(null);
    mockRepository.update.mockResolvedValue(course);
    const dto: CourseDTO = {
      id: "dasdsadsa",
      name: "name",
      description: "description",
      imgSrc: "imgSrc",
      userId: "userId",
    };
    expect(async () => await useCase.execute(dto)).rejects.toThrow(ApiError);
  });
});
