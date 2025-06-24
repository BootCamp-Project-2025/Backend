import "reflect-metadata";
import { EditLanguageUseCase } from "@/contexts/CoreContext/application/useCases/EditLanguageUseCase";
import { Language } from "@/contexts/CoreContext/domain/entities/Language";
import { UniqueEntityID } from "@/contexts/Shared/domain/UniqueEntityID";

describe("EditLanguageUseCase", () => {
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
    { name: "Spanish", level: "advanced" },
    new UniqueEntityID()
  );

  it("should update a language", async () => {
    const useCase = new EditLanguageUseCase(
      mockLanguageRepo,
      mockFreelancerRepo
    );

    const freelancerMock = {
      languages: {
        exists: () => true,
        edit: jest.fn(),
      },
    };
    mockFreelancerRepo.getById.mockResolvedValue(freelancerMock);
    mockLanguageRepo.editLanguage.mockResolvedValue(language);

    const result = await useCase.execute({ language, freelancerId: "id" });
    expect(result).toEqual(language);
  });

  it("should throw if language doesn't exist", async () => {
    const useCase = new EditLanguageUseCase(
      mockLanguageRepo,
      mockFreelancerRepo
    );
    const freelancerMock = {
      languages: {
        exists: () => false,
        edit: jest.fn(),
      },
    };

    mockFreelancerRepo.getById.mockResolvedValue(freelancerMock);

    await expect(
      useCase.execute({ language, freelancerId: "id" })
    ).rejects.toThrow("the language doesnt exist");
  });
});
