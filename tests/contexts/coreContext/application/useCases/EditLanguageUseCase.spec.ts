import { EditLanguageUseCase } from "@/contexts/CoreContext/application/useCases/EditLanguageUseCase";
import { Language } from "@/contexts/CoreContext/domain/entities/Language";
import { UniqueEntityID } from "@/contexts/Shared/domain/UniqueEntityID";

jest.mock(
  "@/contexts/CoreContext/domain/interfaces/repositories/ILanguageRepository"
);

describe("EditLanguageUseCase", () => {
  it("exist", () => {
    expect(EditLanguageUseCase).toBeDefined();
  });

  const mockRepository = {
    editLanguage: jest.fn(),
    getlanguageId: jest.fn(),
  } as any;
  const editLanguageUseCase = new EditLanguageUseCase(mockRepository);

  it("language edited successfuly", async () => {
    const language: Language = new Language(
      { name: "English", level: "basic" },
      new UniqueEntityID()
    );

    mockRepository.getlanguageId.mockResolvedValue("languageId");
    mockRepository.editLanguage.mockResolvedValue(language);

    const result = await editLanguageUseCase.execute({
      language: language,
      freelancerId: "freelancerId",
    });
    expect(result).resolves;
  });

  it("language edit fail due to language does not exist", async () => {
    const language: Language = new Language(
      { name: "English", level: "basic" },
      new UniqueEntityID()
    );

    mockRepository.getlanguageId.mockResolvedValue(undefined);
    mockRepository.editLanguage.mockResolvedValue(language);

    const result = await editLanguageUseCase.execute({
      language: language,
      freelancerId: "freelancerId",
    });
    expect(result).rejects.toThrow("language does not exist");
  });
});
