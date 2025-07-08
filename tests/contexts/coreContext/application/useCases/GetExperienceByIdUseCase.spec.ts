import "reflect-metadata";
import { GetExperienceByIdUseCase } from "@/contexts/CoreContext/application/useCases/experiences/GetExperienceById";

describe("GetExperienceByIdUseCase", () => {
  let getExperienceByIdUseCase: GetExperienceByIdUseCase;
  let experienceRepoMock: any;

  beforeEach(() => {
    experienceRepoMock = { findById: jest.fn() };
    getExperienceByIdUseCase = new GetExperienceByIdUseCase(experienceRepoMock);
  });

  it("should throw error if experienceId is missing", async () => {
    await expect(getExperienceByIdUseCase.execute("")).rejects.toThrowError(
      "Experience ID is required"
    );
  });

  it("should return experience if found", async () => {
    const fakeExperience = { id: "exp123" };
    experienceRepoMock.findById.mockResolvedValue(fakeExperience);

    const result = await getExperienceByIdUseCase.execute("exp123");
    expect(experienceRepoMock.findById).toHaveBeenCalledWith("exp123");
    expect(result).toEqual(fakeExperience);
  });
});
