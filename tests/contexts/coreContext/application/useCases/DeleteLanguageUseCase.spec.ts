import "reflect-metadata";
import { DeleteLanguageUseCase } from "@/contexts/CoreContext/application/useCases/DeleteLanguageUseCase";
import { Language } from "@/contexts/CoreContext/domain/entities/Language";
import { UniqueEntityID } from "@/contexts/Shared/domain/UniqueEntityID";

describe("DeleteLanguageUseCase", () => {
  const mockLanguageRepo = {
    findById: jest.fn(),
    delete: jest.fn(),
  };

  const mockFreelancerRepo = {
    getById: jest.fn(),
  };

  const language = Language.create(
    { name: "German", level: "native" },
    new UniqueEntityID("languageId")
  );

  it("should delete a language", async () => {
    const useCase = new DeleteLanguageUseCase(
      mockLanguageRepo as any,
      mockFreelancerRepo as any
    );

    const freelancerMock = {
      languages: {
        getItems: () => [language],
        remove: jest.fn(),
      },
    };

    mockFreelancerRepo.getById.mockResolvedValue(freelancerMock);
    mockLanguageRepo.findById.mockResolvedValue(language);
    mockLanguageRepo.delete.mockResolvedValue(undefined);

    const result = await useCase.execute({ languageId: "languageId", freelancerId: "id" });
    expect(result).toBeUndefined();
    expect(mockLanguageRepo.delete).toHaveBeenCalledWith("languageId");
    expect(freelancerMock.languages.remove).toHaveBeenCalledWith(language);
  });

  it("should throw if freelancer not found", async () => {
    const useCase = new DeleteLanguageUseCase(
      mockLanguageRepo as any,
      mockFreelancerRepo as any
    );

    mockFreelancerRepo.getById.mockResolvedValue(null);

    await expect(
      useCase.execute({ languageId: "languageId", freelancerId: "id" })
    ).rejects.toThrow("Freelancer not found");
  });
});
