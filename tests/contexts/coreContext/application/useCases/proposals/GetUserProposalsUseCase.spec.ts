import "reflect-metadata";
import { Proposal } from "@/contexts/CoreContext/domain/entities/Proposal";
import GetUserProposalsUseCase from "@/contexts/CoreContext/application/useCases/proposal/GetUserProposalsUseCase";
import { IProposalReposisory } from "@/contexts/CoreContext/domain/interfaces/repositories/IProposalRepository";

describe("GetUserProposalsUseCase", () => {
  it("should call repository.findAllByUserId", async () => {
    const mockRepository: Partial<IProposalReposisory> = {
      findAllByUserId: jest
        .fn()
        .mockResolvedValue(["p1"] as unknown as Proposal[]),
    };

    const useCase = new GetUserProposalsUseCase(
      mockRepository as IProposalReposisory
    );
    const result = await useCase.execute("user-1");

    expect(result).toEqual(["p1"]);
    expect(mockRepository.findAllByUserId).toHaveBeenCalledWith("user-1");
  });
});
