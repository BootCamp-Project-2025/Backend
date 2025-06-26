import "reflect-metadata";
import { GetLanguagesUseCase } from "@/contexts/CoreContext/application/useCases/GetLanguagesUseCase";
import { Language } from "@/contexts/CoreContext/domain/entities/Language";
import { UniqueEntityID } from "@/contexts/Shared/domain/UniqueEntityID";

describe("GetLanguagesUseCase", () => {
  const mockLanguageRepo = {
    getLanguages: jest.fn(),
  };

  const useCase = new GetLanguagesUseCase(mockLanguageRepo as any);

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
