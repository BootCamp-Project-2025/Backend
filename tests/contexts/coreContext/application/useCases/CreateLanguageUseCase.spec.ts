import "reflect-metadata";
import { CreateLanguageUseCase } from "@/contexts/CoreContext/application/useCases/CreateLanguageUseCase";
import { Language } from "@/contexts/CoreContext/domain/entities/Language";
import { UniqueEntityID } from "@/contexts/Shared/domain/UniqueEntityID";

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

describe("CreateLanguageUseCase", () => {
  it("should add a language", async () => {
    const language = Language.create(
      { name: "English", level: "basic" },
      new UniqueEntityID()
    );
    const useCase = new CreateLanguageUseCase(
      mockLanguageRepo,
      mockFreelancerRepo
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
    const language = Language.create(
      { name: "English", level: "basic" },
      new UniqueEntityID()
    );
    const useCase = new CreateLanguageUseCase(
      mockLanguageRepo,
      mockFreelancerRepo
    );

    mockFreelancerRepo.getById.mockResolvedValue(null);

    await expect(
      useCase.execute({ language, freelancerId: "id" })
    ).rejects.toThrow("Freelancer not found");
  });
});
