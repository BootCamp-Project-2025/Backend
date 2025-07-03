import "reflect-metadata";
import { UpdateExperienceUseCase } from "@/contexts/CoreContext/application/useCases/experiences/UpdateExperienceUseCase";
import { Experience } from "@/contexts/CoreContext/domain/entities/Experience";

describe("UpdateExperienceUseCase", () => {
  let updateExperienceUseCase: UpdateExperienceUseCase;
  let experienceRepoMock: any;
  let freelancerRepoMock: any;

  beforeEach(() => {
    experienceRepoMock = {
      findById: jest.fn(),
      update: jest.fn(),
    };
    freelancerRepoMock = { getById: jest.fn() };
    updateExperienceUseCase = new UpdateExperienceUseCase(
      experienceRepoMock,
      freelancerRepoMock
    );
  });

  it("should throw error if any param is missing", async () => {
    await expect(
      updateExperienceUseCase.execute({
        experienceId: "",
        experience: {} as Experience,
        freelancerId: "freelancer",
      })
    ).rejects.toThrowError("Missing parameters");
  });

  it("should throw error if freelancer does not exist", async () => {
    freelancerRepoMock.getById.mockResolvedValue(null);
    await expect(
      updateExperienceUseCase.execute({
        experienceId: "exp123",
        experience: {} as Experience,
        freelancerId: "freelancer",
      })
    ).rejects.toThrowError("Freelancer not found");
  });

  it("should throw error if experience to update not found", async () => {
    freelancerRepoMock.getById.mockResolvedValue({ id: "freelancer" });
    experienceRepoMock.findById.mockResolvedValue(null);
    await expect(
      updateExperienceUseCase.execute({
        experienceId: "exp123",
        experience: {} as Experience,
        freelancerId: "freelancer",
      })
    ).rejects.toThrowError("Experience not found for update");
  });

  it("should update and return updated experience", async () => {
    const fakeExperience = { id: "exp123" };
    freelancerRepoMock.getById.mockResolvedValue({ id: "freelancer" });
    experienceRepoMock.findById.mockResolvedValue(fakeExperience);
    experienceRepoMock.update.mockResolvedValue(fakeExperience);

    const result = await updateExperienceUseCase.execute({
      experienceId: "exp123",
      experience: fakeExperience as any,
      freelancerId: "freelancer",
    });

    expect(freelancerRepoMock.getById).toHaveBeenCalledWith("freelancer");
    expect(experienceRepoMock.findById).toHaveBeenCalledWith("exp123");
    expect(experienceRepoMock.update).toHaveBeenCalledWith(
      "exp123",
      fakeExperience,
      "freelancer"
    );
    expect(result).toEqual(fakeExperience);
  });
});
