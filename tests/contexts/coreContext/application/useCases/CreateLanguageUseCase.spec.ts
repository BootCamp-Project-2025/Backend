import "reflect-metadata";
import { CreateLanguageUseCase } from "@/contexts/CoreContext/application/useCases/CreateLanguageUseCase";
import { Language } from "@/contexts/CoreContext/domain/entities/Language";
import { UniqueEntityID } from "@/contexts/Shared/domain/UniqueEntityID";

describe("CreateLanguageUseCase", () => {
  const mockLanguageRepo = {
    addLanguage: jest.fn(),
  };

  const mockFreelancerRepo = {
    getById: jest.fn(),
  };

  const language = Language.create(
    { name: "English", level: "basic" },
    new UniqueEntityID()
  );

  it("should add a language", async () => {
    const useCase = new CreateLanguageUseCase(
      mockLanguageRepo as any,
      mockFreelancerRepo as any
    );

    const freelancerMock = {
      languages: { add: jest.fn(), getNewItems: () => [language] },
    };

    mockFreelancerRepo.getById.mockResolvedValue(freelancerMock);
    mockLanguageRepo.addLanguage.mockResolvedValue(language);

    const result = await useCase.execute({ language, freelancerId: "id" });
    expect(result).toEqual(language);
  });

  it("should throw if freelancer not found", async () => {
    const useCase = new CreateLanguageUseCase(
      mockLanguageRepo as any,
      mockFreelancerRepo as any
    );

    mockFreelancerRepo.getById.mockResolvedValue(null);

    await expect(
      useCase.execute({ language, freelancerId: "id" })
    ).rejects.toThrow("Freelancer not found");
  });
});
