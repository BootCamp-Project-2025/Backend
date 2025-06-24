import "reflect-metadata";
import { GetLanguagesUseCase } from "@/contexts/CoreContext/application/useCases/GetLanguagesUseCase";
import { Language } from "@/contexts/CoreContext/domain/entities/Language";
import { UniqueEntityID } from "@/contexts/Shared/domain/UniqueEntityID";

describe("GetLanguagesUseCase", () => {
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
  const useCase = new GetLanguagesUseCase(mockLanguageRepo);

  it("should return all languages", async () => {
    const languageList = [
      Language.create(
        { name: "French", level: "intermediate" },
        new UniqueEntityID()
      ),
    ];

    mockLanguageRepo.getLanguages.mockResolvedValue(languageList);
    const result = await useCase.execute("freelancerId");
    expect(result).toEqual(languageList);
  });

  it("should throw on error", async () => {
    mockLanguageRepo.getLanguages.mockRejectedValue(new Error("DB error"));
    await expect(useCase.execute("freelancerId")).rejects.toThrow(
      "server error"
    );
  });
});
