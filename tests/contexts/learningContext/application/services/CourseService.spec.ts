import "reflect-metadata";
import { CourseService } from "@/contexts/LearningContext/application/services/CourseService";
import { CreateCourseUseCase } from "@/contexts/LearningContext/application/useCases/CreateCourseUseCase";
import {
  Course,
  CourseProps,
} from "@/contexts/LearningContext/domain/aggregates/Course";
import { CourseDTO } from "@/contexts/LearningContext/domain/dtos/CourseDTO";
import IUseCase from "@/contexts/LearningContext/domain/interfaces/IUseCase";
import { CourseDescription } from "@/contexts/LearningContext/domain/valueObjects/CourseDescription";
import { CourseName } from "@/contexts/LearningContext/domain/valueObjects/CourseName";
import { UniqueEntityID } from "@/contexts/Shared/domain/UniqueEntityID";

const getAllCoursesUseCase: jest.Mocked<IUseCase<void, Course[]>> = {
  execute: jest.fn(),
} as any;
const getCourseUseCase: jest.Mocked<IUseCase<string, Course>> = {
  execute: jest.fn(),
} as any;
const editCourseUseCase: jest.Mocked<IUseCase<CourseDTO, Course>> = {
  execute: jest.fn(),
} as any;
const deleteCourseUseCase: jest.Mocked<IUseCase<string, void>> = {
  execute: jest.fn(),
} as any;
const createCoursesUseCase: jest.Mocked<CreateCourseUseCase> = {
  execute: jest.fn(),
} as any;

const empyCourseProps: CourseProps = {
  name: CourseName.create({ name: "name" }),
  description: CourseDescription.create({ description: "course" }),
  imgSrc: "dsadsa",
};

const dto = {
  id: "entityId",
  name: "name",
  description: "course",
  imgSrc: "dsadsa",
  category: "",
  subCategory: "",
  language: "",
  field: "",
  time: undefined,
  requirements: "",
};
const service = new CourseService(
  getAllCoursesUseCase,
  getCourseUseCase,
  editCourseUseCase,
  deleteCourseUseCase,
  createCoursesUseCase
);

const course = Course.create(empyCourseProps, new UniqueEntityID("entityId"));

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Course servicve tests", () => {
  it("exist", () => {
    expect(CourseService).toBeDefined;
  });
  it("edits correctly", () => {
    editCourseUseCase.execute.mockResolvedValue(course);
    expect(
      service.editCourse("asd", {
        name: "name",
        description: "des",
        imgSrc: "",
      })
    ).resolves.toEqual(dto);
  });

  it("deletes correctly", () => {
    getCourseUseCase.execute.mockResolvedValue(course);
    expect(service.deleteCourse("asd")).resolves;
  });

  it("get correctly", () => {
    deleteCourseUseCase.execute.mockResolvedValue();
    expect(service.getCourse("courseId")).resolves.toEqual(dto);
  });
});
