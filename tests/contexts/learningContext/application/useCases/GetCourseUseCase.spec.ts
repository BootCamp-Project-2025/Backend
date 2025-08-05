import "reflect-metadata";
import { GetCourseUseCase } from "@/contexts/LearningContext/application/useCases/GetCourseUseCase";
import { ICourseRepository } from "@/contexts/LearningContext/domain/interfaces/ICourseRepository";
import {
  Course,
  CourseProps,
} from "@/contexts/LearningContext/domain/aggregates/Course";
import { CourseName } from "@/contexts/LearningContext/domain/valueObjects/CourseName";
import { CourseDescription } from "@/contexts/LearningContext/domain/valueObjects/CourseDescription";
import { UniqueEntityID } from "@/contexts/Shared/domain/UniqueEntityID";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { Modules } from "@/contexts/LearningContext/domain/OneToMany/Modules";
import { UserId } from "@/contexts/CoreContext/domain/valueObjects/UserId";

const mockRepository: jest.Mocked<ICourseRepository> = {
  findById: jest.fn(),
} as any;

const empyCourseProps: CourseProps = {
  name: CourseName.create({ name: "name" }),
  description: CourseDescription.create({ description: "course" }),
  imgSrc: "dsadsa",
  modules: new Modules(),
  userId: UserId.create(new UniqueEntityID("userID")),
  published: false,
};

const useCase = new GetCourseUseCase(mockRepository);

beforeEach(() => {
  jest.clearAllMocks();
});

describe("GetCourseUseCase", () => {
  it("exist", () => {
    expect(GetCourseUseCase).toBeDefined;
  });

  it("deletes correctly", () => {
    const course = Course.create(
      empyCourseProps,
      new UniqueEntityID("de12ef32r3r33r")
    );
    mockRepository.findById.mockResolvedValue(course);

    expect(async () => await useCase.execute("de12ef32r3r33r")).resolves;
  });

  it("not found", () => {
    mockRepository.findById.mockResolvedValue(null);

    expect(async () => await useCase.execute("de12ef32r3r33r")).rejects.toThrow(
      ApiError
    );
  });
});
