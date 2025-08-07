import "reflect-metadata";
import { CreateCourseUseCase } from "../../../../../src/contexts/LearningContext/application/useCases/CreateCourseUseCase";
import { ICourseRepository } from "../../../../../src/contexts/LearningContext/domain/interfaces/ICourseRepository";
import { CourseDTO } from "../../../../../src/contexts/LearningContext/domain/dtos/CourseDTO";
import { Course } from "../../../../../src/contexts/LearningContext/domain/aggregates/Course";
import { CourseName } from "../../../../../src/contexts/LearningContext/domain/valueObjects/CourseName";
import { CourseDescription } from "../../../../../src/contexts/LearningContext/domain/valueObjects/CourseDescription";
import { UserId } from "@/contexts/CoreContext/domain/valueObjects/UserId";
import { UniqueEntityID } from "@/contexts/Shared/domain/UniqueEntityID";
import { Modules } from "@/contexts/LearningContext/domain/OneToMany/Modules";

describe("CreateCourseUseCase", () => {
  let repoMock: { insert: jest.Mock };
  let useCase: CreateCourseUseCase;

  beforeEach(() => {
    repoMock = { insert: jest.fn() };
    useCase = new CreateCourseUseCase(repoMock as unknown as ICourseRepository);
    jest.clearAllMocks();
  });

  it("should build a Course aggregate and call repo.insert with the correct props", async () => {
    const dto: CourseDTO = {
      name: "Curso Test",
      description: "Descripción de prueba",
      imgSrc: "https://example.com/img.png",
      userId: "userId",
      published: false,
    };

    const fakeCourse = Course.create({
      name: CourseName.create({ name: dto.name }),
      description: CourseDescription.create({ description: dto.description }),
      imgSrc: dto.imgSrc,
      userId: UserId.create(new UniqueEntityID(dto.userId)),
      modules: Modules.create([]),
      published: dto.published ?? false,
    });

    repoMock.insert.mockResolvedValue(fakeCourse);

    const result = await useCase.execute(dto);

    expect(repoMock.insert).toHaveBeenCalledTimes(1);

    const passedCourse: Course = repoMock.insert.mock.calls[0][0];
    expect(passedCourse).toBeInstanceOf(Course);

    expect(passedCourse.getName().value).toBe(dto.name);
    expect(passedCourse.getDescription().value).toBe(dto.description);
    expect(passedCourse.getImgSrc()).toBe(dto.imgSrc);
    expect(passedCourse.getPublished()).toBe(dto.published);

    expect(result).toBe(fakeCourse);
  });
});
