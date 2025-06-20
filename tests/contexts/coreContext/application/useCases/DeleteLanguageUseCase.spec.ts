import { DeleteLanguageUseCase } from "@/contexts/CoreContext/application/useCases/DeleteLanguageUseCase";
import { Language } from "@/contexts/CoreContext/domain/entities/Language";
import { UniqueEntityID } from "@/contexts/Shared/domain/UniqueEntityID";

jest.mock(
  "@/contexts/CoreContext/domain/interfaces/repositories/ILanguageRepository"
);

describe("AddSkillUseCase", () => {
  it("exist", () => {
    expect(DeleteLanguageUseCase).toBeDefined();
  });

  const mockRepository = {
    removeLanguage: jest.fn(),
    getlanguageId: jest.fn(),
  } as any;
  const deleteLanguageUseCase = new DeleteLanguageUseCase(mockRepository);

  it("language deleted successfuly", async () => {
    const language: Language = new Language(
      { name: "English", level: "basic" },
      new UniqueEntityID()
    );

    mockRepository.getlanguageId.mockResolvedValue("languageId");
    mockRepository.removeLanguage.mockResolvedValue(language);

    const result = await deleteLanguageUseCase.execute({
      language: language,
      freelancerId: "freelancerId",
    });
    expect(result).resolves;
  });

  it("language delete fail due to language does not exist", async () => {
    const language: Language = new Language(
      { name: "English", level: "basic" },
      new UniqueEntityID()
    );

    mockRepository.getlanguageId.mockResolvedValue(undefined);
    mockRepository.removeLanguage.mockResolvedValue(language);

    const result = await deleteLanguageUseCase.execute({
      language: language,
      freelancerId: "freelancerId",
    });
    expect(result).rejects.toThrow("language does not exist");
  });
});
