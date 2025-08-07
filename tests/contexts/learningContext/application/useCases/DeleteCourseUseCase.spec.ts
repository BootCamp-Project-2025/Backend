import "reflect-metadata";
import { DeleteCourseUseCase } from "../../../../../src/contexts/LearningContext/application/useCases/DeleteCourseUseCase";
import { ICourseRepository } from "../../../../../src/contexts/LearningContext/domain/interfaces/ICourseRepository";

describe("DeleteCourseUseCase", () => {
  let repoMock: { delete: jest.Mock };
  let useCase: DeleteCourseUseCase;

  beforeEach(() => {
    repoMock = { delete: jest.fn() };

    useCase = new DeleteCourseUseCase(repoMock as unknown as ICourseRepository);

    jest.clearAllMocks();
  });

  it("should call courseRepo.delete with the provided id", async () => {
    const testId = "course-123";

    await expect(useCase.execute(testId)).resolves.toBeUndefined();

    expect(repoMock.delete).toHaveBeenCalledTimes(1);
    expect(repoMock.delete).toHaveBeenCalledWith(testId);
  });
});
