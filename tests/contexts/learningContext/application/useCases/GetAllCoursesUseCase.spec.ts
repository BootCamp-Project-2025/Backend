import "reflect-metadata";
import { GetAllCoursesUseCase } from "../../../../../src/contexts/LearningContext/application/useCases/GetAllCoursesUseCase";
import { ICourseRepository } from "../../../../../src/contexts/LearningContext/domain/interfaces/ICourseRepository";
import { Course } from "../../../../../src/contexts/LearningContext/domain/aggregates/Course";

describe("GetAllCoursesUseCase", () => {
  let repoMock: { findAll: jest.Mock<Promise<Course[]>, []> };
  let useCase: GetAllCoursesUseCase;

  beforeEach(() => {
    repoMock = { findAll: jest.fn() };

    useCase = new GetAllCoursesUseCase(
      repoMock as unknown as ICourseRepository
    );
  });

  it("should call repo.findAll and return the array of Course instances", async () => {
    const fakeCourses: Course[] = [{} as Course, {} as Course];
    repoMock.findAll.mockResolvedValue(fakeCourses);

    const result = await useCase.execute();

    expect(repoMock.findAll).toHaveBeenCalledTimes(1);

    expect(result).toBe(fakeCourses);
  });
});
