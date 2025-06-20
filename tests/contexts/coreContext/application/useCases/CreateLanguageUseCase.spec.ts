import { CreateLanguageUseCase } from "@/contexts/CoreContext/application/useCases/CreateLanguageUseCase";
import { Language } from "@/contexts/CoreContext/domain/entities/Language";
import { UniqueEntityID } from "@/contexts/Shared/domain/UniqueEntityID";

jest.mock(
  "@/contexts/CoreContext/domain/interfaces/repositories/ILanguageRepository"
);

describe("AddSkillUseCase", () => {
  it("exist", () => {
    expect(CreateLanguageUseCase).toBeDefined();
  });

  const mockRepository = {
    addLanguage: jest.fn(),
  } as any;
  const createLanguageUseCase = new CreateLanguageUseCase(mockRepository);

  it("language added successfuly", async () => {
    const language: Language = new Language(
      { name: "English", level: "basic" },
      new UniqueEntityID()
    );

    mockRepository.addLanguage.mockResolvedValue(language);

    const result = await createLanguageUseCase.execute({
      language: language,
      freelancerId: "freelancerId",
    });
    expect(result).resolves;
  });

  it("language add fail due to reapeated", async () => {
    const language: Language = new Language(
      { name: "English", level: "basic" },
      new UniqueEntityID()
    );

    mockRepository.addLanguage.mockResolvedValue(language);

    const result = await createLanguageUseCase.execute({
      language: language,
      freelancerId: "freelancerId",
    });
    expect(result).rejects.toThrow("language repeated");
  });
});
