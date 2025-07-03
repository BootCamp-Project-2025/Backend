import "reflect-metadata";
import { DeleteExperienceUseCase } from "@/contexts/CoreContext/application/useCases/experiences/DeleteExperienceUseCase";

describe("DeleteExperienceUseCase", () => {
  let deleteExperienceUseCase: DeleteExperienceUseCase;
  let experienceRepoMock: any;

  beforeEach(() => {
    experienceRepoMock = { delete: jest.fn() };
    deleteExperienceUseCase = new DeleteExperienceUseCase(experienceRepoMock);
  });

  it("should throw error if experienceId is missing", async () => {
    await expect(deleteExperienceUseCase.execute("")).rejects.toThrowError(
      "Missing experience ID"
    );
  });

  it("should call repository delete", async () => {
    experienceRepoMock.delete.mockResolvedValue(undefined);
    await deleteExperienceUseCase.execute("exp123");
    expect(experienceRepoMock.delete).toHaveBeenCalledWith("exp123");
  });
});
