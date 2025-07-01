import "reflect-metadata";
import { CreateExperienceUseCase } from "@/contexts/CoreContext/application/useCases/experiences/CreateExperienceUseCase";

describe("CreateExperienceUseCase", () => {
  let createExperienceUseCase: CreateExperienceUseCase;
  let experienceRepoMock: any;
  let freelancerRepoMock: any;

  beforeEach(() => {
    experienceRepoMock = { create: jest.fn() };
    freelancerRepoMock = { getById: jest.fn() };

    createExperienceUseCase = new CreateExperienceUseCase(
      experienceRepoMock,
      freelancerRepoMock
    );
  });

  it("should throw error if params are missing", async () => {
    await expect(createExperienceUseCase.execute()).rejects.toThrowError(
      "Missing parameters"
    );
  });

  it("should throw error if freelancer does not exist", async () => {
    freelancerRepoMock.getById.mockResolvedValue(null);

    await expect(
      createExperienceUseCase.execute({
        experience: {
          position: "",
          employer: "",
          country: "",
          startDate: new Date(),
          endDate: new Date(),
          description: "",
          freelancerId: "",
        },
        freelancerId: "123",
      })
    ).rejects.toThrowError("Freelancer not found");
  });

  it("should create and return experience", async () => {
    const fakeExperience = {
      position: "Dev",
      employer: "x",
      country: "x",
      startDate: new Date(),
      endDate: new Date(),
      description: "x",
      freelancerId: "123",
    };

    freelancerRepoMock.getById.mockResolvedValue({
      id: "123",
      experience: {
        add: jest.fn(),
      },
    });

    experienceRepoMock.create.mockResolvedValue(fakeExperience);

    const result = await createExperienceUseCase.execute({
      experience: fakeExperience,
      freelancerId: "123",
    });

    expect(freelancerRepoMock.getById).toHaveBeenCalledWith("123");
    expect(experienceRepoMock.create).toHaveBeenCalled();
    expect(result).toEqual(fakeExperience);
  });
});
