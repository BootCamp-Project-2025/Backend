import "reflect-metadata";
import { GetLanguagesUseCase } from "@/contexts/CoreContext/application/useCases/GetLanguagesUseCase";
import { Language } from "@/contexts/CoreContext/domain/entities/Language";
import { UniqueEntityID } from "@/contexts/Shared/domain/UniqueEntityID";
import { IFreelancerRepository } from "@/contexts/CoreContext/domain/interfaces/repositories/IFreelancerRepository";
import { ILanguageRepository } from "@/contexts/CoreContext/domain/interfaces/repositories/ILanguageRepositoty";

describe("GetLanguagesUseCase", () => {
  const getLanguages = jest.fn();
  const getByIdMock = jest.fn();

  const mockLanguageRepo: ILanguageRepository = {
    getLanguages: getLanguages,
  } as unknown as ILanguageRepository;

  const freelancerMock = {
    languages: {
      exists: () => true,
      edit: jest.fn(),
    },
  };

  const mockFreelancerRepo: IFreelancerRepository = {
    getById: getByIdMock.mockResolvedValue(freelancerMock),
  } as unknown as IFreelancerRepository;

  const useCase = new GetLanguagesUseCase(mockLanguageRepo, mockFreelancerRepo);

  it("should return all languages", async () => {
    const languageList = [
      Language.create(
        { name: "French", level: "intermediate" },
        new UniqueEntityID()
      ),
    ];

    getLanguages.mockResolvedValue(languageList);
    const result = await useCase.execute("freelancerId");
    expect(result).toEqual(languageList);
  });

  it("should throw on error", async () => {
    getLanguages.mockRejectedValue(new Error("DB error"));
    await expect(useCase.execute("freelancerId")).rejects.toThrow(
      "server error"
    );
  });
});
