import "reflect-metadata";
import { UpdateCourseUseCase } from "../../../../../src/contexts/LearningContext/application/useCases/UpdateCourseUseCase";
import { ICourseRepository } from "../../../../../src/contexts/LearningContext/domain/interfaces/ICourseRepository";
import { CourseDTO } from "../../../../../src/contexts/LearningContext/domain/dtos/CourseDTO";
import { Course } from "../../../../../src/contexts/LearningContext/domain/aggregates/Course";
import { CourseMapper } from "../../../../../src/contexts/LearningContext/mappers/CourseMapper";

jest.mock(
  "../../../../../src/contexts/LearningContext/mappers/CourseMapper",
  () => ({
    CourseMapper: {
      fromDTO: jest.fn(),
    },
  })
);

describe("UpdateCourseUseCase", () => {
  let repoMock: { update: jest.Mock<Promise<Course>, [Course]> };
  let useCase: UpdateCourseUseCase;

  beforeEach(() => {
    repoMock = { update: jest.fn() };
    useCase = new UpdateCourseUseCase(repoMock as unknown as ICourseRepository);
  });

  it("should map the DTO to a domain Course and call repo.update with it", async () => {
    const input: CourseDTO = {
      id: "course-1",
      name: "Updated Name",
      description: "Updated Description",
      imgSrc: "http://example.com/new.png",
      userId: "userId"
    };

    const fakeDomainCourse = {} as Course;
    (CourseMapper.fromDTO as jest.Mock).mockReturnValue(fakeDomainCourse);

    repoMock.update.mockResolvedValue(fakeDomainCourse);

    const result = await useCase.execute(input);

    expect(CourseMapper.fromDTO).toHaveBeenCalledTimes(1);
    expect(CourseMapper.fromDTO).toHaveBeenCalledWith(input);

    expect(repoMock.update).toHaveBeenCalledTimes(1);
    expect(repoMock.update).toHaveBeenCalledWith(fakeDomainCourse);

    expect(result).toBe(fakeDomainCourse);
  });
});
