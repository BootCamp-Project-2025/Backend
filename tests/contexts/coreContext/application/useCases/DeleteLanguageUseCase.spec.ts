import "reflect-metadata";
import { DeleteLanguageUseCase } from "@/contexts/CoreContext/application/useCases/DeleteLanguageUseCase";
import { Language } from "@/contexts/CoreContext/domain/entities/Language";
import { UniqueEntityID } from "@/contexts/Shared/domain/UniqueEntityID";

describe("DeleteLanguageUseCase", () => {
  const mockLanguageRepo = {
    addLanguage: jest.fn(),
    getLanguages: jest.fn(),
    editLanguage: jest.fn(),
    deleteLanguage: jest.fn(),
    getlanguageId: jest.fn(),
    getAll: jest.fn(),
    getById: jest.fn(),
    delete: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
  const mockFreelancerRepo = {
    getById: jest.fn(),
    getAll: jest.fn(),
    delete: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };

  const language = Language.create(
    { name: "German", level: "native" },
    new UniqueEntityID()
  );

  it("should delete a language", async () => {
    const useCase = new DeleteLanguageUseCase(
      mockLanguageRepo,
      mockFreelancerRepo
    );
    const freelancerMock = {
      languages: {
        exists: () => true,
        remove: jest.fn(),
      },
    };

    mockFreelancerRepo.getById.mockResolvedValue(freelancerMock);
    mockLanguageRepo.deleteLanguage.mockResolvedValue(language);

    const result = await useCase.execute({ language, freelancerId: "id" });
    expect(result).toEqual(language);
  });

  it("should throw if freelancer not found", async () => {
    const useCase = new DeleteLanguageUseCase(
      mockLanguageRepo,
      mockFreelancerRepo
    );
    mockFreelancerRepo.getById.mockResolvedValue(null);

    await expect(
      useCase.execute({ language, freelancerId: "id" })
    ).rejects.toThrow("Freelancer not found");
  });
});
