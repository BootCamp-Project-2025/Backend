import "reflect-metadata";
import { DeleteExperienceUseCase } from "@/contexts/CoreContext/application/useCases/experiences/DeleteExperienceUseCase";
import { UniqueEntityID } from "@/contexts/Shared/domain/UniqueEntityID";
import { Experience } from "@/contexts/CoreContext/domain/entities/Experience";

describe("DeleteExperienceUseCase", () => {
  let deleteExperienceUseCase: DeleteExperienceUseCase;
  let experienceRepoMock: any;
  let freelancerRepoMock: any;

  const experience = Experience.create(
    {
      position: "Dev",
      employer: "Company",
      country: "Country",
      startDate: new Date(),
      endDate: new Date(),
      description: "desc",
      freelancerId: "freelancerId",
    },
    new UniqueEntityID("exp123")
  );

  beforeEach(() => {
    experienceRepoMock = { delete: jest.fn() };
    freelancerRepoMock = { getById: jest.fn() };
    deleteExperienceUseCase = new DeleteExperienceUseCase(
      experienceRepoMock,
      freelancerRepoMock
    );
  });

  it("should throw error if experienceId is missing", async () => {
    await expect(
      deleteExperienceUseCase.execute({
        experienceId: "",
        freelancerId: "freelancerId",
      })
    ).rejects.toThrowError("Missing experience ID");
  });

  it("should call repository delete", async () => {
    const freelancerMock = {
      experience: {
        getItems: () => [experience],
        remove: jest.fn(),
      },
    };

    freelancerRepoMock.getById.mockResolvedValue(freelancerMock);
    experienceRepoMock.delete.mockResolvedValue(undefined);

    const result = await deleteExperienceUseCase.execute({
      experienceId: "exp123",
      freelancerId: "freelancerId",
    });

    expect(result).toBeUndefined();
    expect(experienceRepoMock.delete).toHaveBeenCalledWith("exp123");
    expect(freelancerMock.experience.remove).toHaveBeenCalledWith(experience);
  });
});
