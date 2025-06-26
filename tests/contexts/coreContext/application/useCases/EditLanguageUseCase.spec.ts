import "reflect-metadata";
import { EditLanguageUseCase } from "@/contexts/CoreContext/application/useCases/EditLanguageUseCase";
import { Language } from "@/contexts/CoreContext/domain/entities/Language";
import { UniqueEntityID } from "@/contexts/Shared/domain/UniqueEntityID";
import { ILanguageRepository } from "@/contexts/CoreContext/domain/interfaces/repositories/ILanguageRepositoty";
import { IFreelancerRepository } from "@/contexts/CoreContext/domain/interfaces/repositories/IFreelancerRepository";

describe("EditLanguageUseCase", () => {
  const language = Language.create(
    { name: "Spanish", level: "advanced" },
    new UniqueEntityID("123")
  );

  const editLanguageMock = jest.fn();
  const getByIdMock = jest.fn();

  const mockLanguageRepo: ILanguageRepository = {
    editLanguage: editLanguageMock,
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

  it("should update a language", async () => {
    const useCase = new EditLanguageUseCase(
      mockLanguageRepo,
      mockFreelancerRepo
    );

    editLanguageMock.mockResolvedValue(language);

    const result = await useCase.execute({ language, freelancerId: "id" });

    expect(result).toEqual(language);
    expect(freelancerMock.languages.edit).toHaveBeenCalledWith(language);
    expect(editLanguageMock).toHaveBeenCalledWith(language);
  });

  it("should throw if language doesn't exist", async () => {
    const freelancerMockNoLang = {
      languages: {
        exists: () => false,
        edit: jest.fn(),
      },
    };

    const getByIdMock2 = jest.fn().mockResolvedValue(freelancerMockNoLang);

    const mockFreelancerRepo2: IFreelancerRepository = {
      getById: getByIdMock2,
    } as unknown as IFreelancerRepository;

    const useCase = new EditLanguageUseCase(
      mockLanguageRepo,
      mockFreelancerRepo2
    );

    await expect(
      useCase.execute({ language, freelancerId: "id" })
    ).rejects.toThrow("the language doesnt exist");
  });
});
