import "reflect-metadata";
import { GetExperiencesUseCase } from "@/contexts/CoreContext/application/useCases/experiences/GetExperienceUseCase";

describe("GetExperiencesUseCase", () => {
  let getExperiencesUseCase: GetExperiencesUseCase;
  let experienceRepoMock: any;
  let freelancerRepoMock: any;

  beforeEach(() => {
    experienceRepoMock = { getAll: jest.fn() };
    freelancerRepoMock = { getById: jest.fn() };
    getExperiencesUseCase = new GetExperiencesUseCase(
      experienceRepoMock,
      freelancerRepoMock
    );
  });

  it("should throw error if freelancerId is missing", async () => {
    await expect(getExperiencesUseCase.execute("")).rejects.toThrowError(
      "Freelancer ID is required"
    );
  });

  it("should throw error if freelancer does not exist", async () => {
    freelancerRepoMock.getById.mockResolvedValue(null);
    await expect(
      getExperiencesUseCase.execute("freelancer")
    ).rejects.toThrowError("Freelancer not found");
  });

  it("should return array of experiences", async () => {
    const fakeExperiences = [{ id: "exp1" }, { id: "exp2" }];
    freelancerRepoMock.getById.mockResolvedValue({ id: "freelancer" });
    experienceRepoMock.getAll.mockResolvedValue(fakeExperiences);

    const result = await getExperiencesUseCase.execute("freelancer");

    expect(freelancerRepoMock.getById).toHaveBeenCalledWith("freelancer");
    expect(experienceRepoMock.getAll).toHaveBeenCalledWith("freelancer");
    expect(result).toEqual(fakeExperiences);
  });
});
