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

const mockRepository: jest.Mocked<ICourseRepository> = {
  update: jest.fn(),
  findById: jest.fn(),
} as any;

const empyCourseProps: CourseProps = {
  name: CourseName.create({ name: "name" }),
  description: CourseDescription.create({ description: "course" }),
  imgSrc: "dsadsa",
};

const useCase = new EditCourseUseCase(mockRepository);

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
    };
    expect(async () => await useCase.execute(dto)).resolves;
  });
});
