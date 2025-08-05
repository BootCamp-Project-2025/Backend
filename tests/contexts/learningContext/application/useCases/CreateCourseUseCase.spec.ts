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
import { CourseMapper } from "@/contexts/LearningContext/mappers/CourseMapper";
import { globalEventDispatcher } from "@/eventRegister";
import { IndexResourceEvent } from "@/contexts/Shared/domain/events/IndexResourceEvent";

jest.mock("@/eventRegister", () => ({
  globalEventDispatcher: {
    dispatch: jest.fn(),
  },
}));

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

  it("should dispatch an IndexResourceEvent with the mapped course DTO", async () => {
    const dto: CourseDTO = {
      name: "Curso Test",
      description: "Descripción de prueba",
      imgSrc: "https://example.com/img.png",
      userId: "userId123",
    };

    const fakeCourse = Course.create({
      name: CourseName.create({ name: dto.name }),
      description: CourseDescription.create({ description: dto.description }),
      imgSrc: dto.imgSrc,
      userId: UserId.create(new UniqueEntityID(dto.userId)),
      modules: Modules.create([]),
      published: false,
    });

    const mockMappedDto = {
      id: "123",
      name: dto.name,
      description: dto.description,
      userId: dto.userId,
      createdAt: new Date(),
    };

    jest.spyOn(CourseMapper, "domainToIndex").mockReturnValue(mockMappedDto);
    (repoMock.insert as jest.Mock).mockResolvedValue(fakeCourse);

    await useCase.execute(dto);

    expect(CourseMapper.domainToIndex).toHaveBeenCalledWith(expect.any(Course));

    expect(globalEventDispatcher.dispatch).toHaveBeenCalledWith(
      expect.any(IndexResourceEvent)
    );

    const dispatchedEvent = (globalEventDispatcher.dispatch as jest.Mock).mock
      .calls[0][0];
    console.log(
      "Dispatch call:",
      (globalEventDispatcher.dispatch as jest.Mock).mock.calls
    );
    expect(dispatchedEvent).toBeInstanceOf(IndexResourceEvent);
    expect(dispatchedEvent.payload.resource).toBe("course");
    expect(dispatchedEvent.payload.resourceDto).toEqual(mockMappedDto);
  });
});
