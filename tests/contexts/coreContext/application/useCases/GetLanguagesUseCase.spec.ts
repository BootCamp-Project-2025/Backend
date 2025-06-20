import { GetLanguagesUseCase } from "@/contexts/CoreContext/application/useCases/GetLanguagesUseCase";
import { Language } from "@/contexts/CoreContext/domain/entities/Language";
import { UniqueEntityID } from "@/contexts/Shared/domain/UniqueEntityID";

jest.mock(
  "@/contexts/CoreContext/domain/interfaces/repositories/ILanguageRepository"
);

describe("AddSkillUseCase", () => {
  it("exist", () => {
    expect(GetLanguagesUseCase).toBeDefined();
  });

  const mockRepository = {
    getLanguages: jest.fn(),
  } as any;
  const getLanguagesUseCase = new GetLanguagesUseCase(mockRepository);

  it("languages getted successfuly", async () => {
    const language: Language = new Language(
      { name: "English", level: "basic" },
      new UniqueEntityID()
    );

    mockRepository.getLanguages.mockResolvedValue("freelancerId");

    const result = await getLanguagesUseCase.execute("freelancerId");
    expect(result).toEqual([language]);
  });
});
