import "reflect-metadata";
import { DeleteLanguageUseCase } from "@/contexts/CoreContext/application/useCases/DeleteLanguageUseCase";
import { Language } from "@/contexts/CoreContext/domain/entities/Language";
import { UniqueEntityID } from "@/contexts/Shared/domain/UniqueEntityID";

describe("DeleteLanguageUseCase", () => {
  const mockLanguageRepo = {
    delete: jest.fn(),
  };

  const mockFreelancerRepo = {
    getById: jest.fn(),
  };

  const language = Language.create(
    { name: "German", level: "native" },
    new UniqueEntityID()
  );

  it("should delete a language", async () => {
    const useCase = new DeleteLanguageUseCase(
      mockLanguageRepo as any,
      mockFreelancerRepo as any
    );

    const freelancerMock = {
      languages: {
        exists: () => true,
        remove: jest.fn(),
      },
    };

    mockFreelancerRepo.getById.mockResolvedValue(freelancerMock);
    mockLanguageRepo.delete.mockResolvedValue(language);

    const result = await useCase.execute({ language, freelancerId: "id" });
    expect(result).toEqual(language);
  });

  it("should throw if freelancer not found", async () => {
    const useCase = new DeleteLanguageUseCase(
      mockLanguageRepo as any,
      mockFreelancerRepo as any
    );

    mockFreelancerRepo.getById.mockResolvedValue(null);

    await expect(
      useCase.execute({ language, freelancerId: "id" })
    ).rejects.toThrow("Freelancer not found");
  });
});
