import "reflect-metadata";
import { PublishCourseUseCase } from "@/contexts/LearningContext/application/useCases/PublishCourseUseCase";
import { ICourseRepository } from "@/contexts/LearningContext/domain/interfaces/ICourseRepository";
import IUseCase from "@/contexts/LearningContext/domain/interfaces/IUseCase";
import { Module } from "@/contexts/LearningContext/domain/entities/Module";
import { Course } from "@/contexts/LearningContext/domain/aggregates/Course";
import { CourseName } from "@/contexts/LearningContext/domain/valueObjects/CourseName";
import { CourseDescription } from "@/contexts/LearningContext/domain/valueObjects/CourseDescription";
import { UserId } from "@/contexts/CoreContext/domain/valueObjects/UserId";
import { UniqueEntityID } from "@/contexts/Shared/domain/UniqueEntityID";
import { Modules } from "@/contexts/LearningContext/domain/OneToMany/Modules";
import { CourseMapper } from "@/contexts/LearningContext/mappers/CourseMapper";
import { IndexResourceEvent } from "@/contexts/Shared/domain/events/IndexResourceEvent";
import { DeleteResourceEvent } from "@/contexts/Shared/domain/events/DeleteResourceEvent";
import { globalEventDispatcher } from "@/eventRegister";

jest.mock("@/eventRegister", () => ({
  globalEventDispatcher: {
    dispatch: jest.fn(),
  },
}));

describe("PublishCourseUseCase", () => {
  let repoMock: jest.Mocked<ICourseRepository>;
  let getAllModulesUseCaseMock: jest.Mocked<IUseCase<string, Module[]>>;
  let useCase: PublishCourseUseCase;
  let fakeCourse: Course;

  beforeEach(() => {
    repoMock = {
      findById: jest.fn(),
      publish: jest.fn(),
      findAll: jest.fn(),
      insert: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    getAllModulesUseCaseMock = {
      execute: jest.fn(),
    };

    useCase = new PublishCourseUseCase(repoMock, getAllModulesUseCaseMock);

    fakeCourse = Course.create({
      name: CourseName.create({ name: "Curso Test" }),
      description: CourseDescription.create({ description: "Descripción" }),
      imgSrc: "http://img.com",
      userId: UserId.create(new UniqueEntityID("user123")),
      modules: Modules.create([]),
      published: false,
    });
  });

  it("should dispatch IndexResourceEvent when publishing", async () => {
    const modules: Module[] = [];

    repoMock.publish.mockResolvedValue(true);
    repoMock.findById.mockResolvedValue(fakeCourse);
    getAllModulesUseCaseMock.execute.mockResolvedValue(modules);

    const mockMapped = {
      id: "id",
      name: "Curso Test",
      description: "Descripción",
      userId: "user123",
      imgSrc: "http://img.com",
      createdAt: new Date(),
      modules: [],
    };
    jest.spyOn(CourseMapper, "domainToIndex").mockReturnValue(mockMapped);

    const result = await useCase.execute({ id: "course-id", published: true });

    expect(result).toBe(true);
    expect(globalEventDispatcher.dispatch).toHaveBeenCalledWith(
      expect.any(IndexResourceEvent)
    );
  });

  it("should dispatch DeleteResourceEvent when unpublishing", async () => {
    repoMock.publish.mockResolvedValue(true);
    repoMock.findById.mockResolvedValue(fakeCourse);

    const result = await useCase.execute({ id: "course-id", published: false });

    expect(result).toBe(true);
    expect(globalEventDispatcher.dispatch).toHaveBeenCalledWith(
      expect.any(DeleteResourceEvent)
    );
  });

  it("should throw error when course not found", async () => {
    repoMock.publish.mockResolvedValue(true);
    repoMock.findById.mockResolvedValue(null);

    await expect(
      useCase.execute({ id: "non-existent-id", published: true })
    ).rejects.toThrow("Course not found");
  });
});
