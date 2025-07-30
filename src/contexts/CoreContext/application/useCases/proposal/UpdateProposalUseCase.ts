import { Proposal } from "@/contexts/CoreContext/domain/entities/Proposal";
import { ProposalRepository } from "@/contexts/CoreContext/infrastructure/persistence/ProposalRepository";
import IUseCase from "@/contexts/LearningContext/domain/interfaces/IUseCase";
import { inject, injectable } from "tsyringe";

@injectable()
export class UpdateProposalUseCase
  implements IUseCase<{ proposalId: string; proposal: Proposal }, Proposal>
{
  constructor(
    @inject("IProposalRepository")
    private proposalRepository: ProposalRepository
  ) {}

  async execute({
    proposalId,
    proposal,
  }: {
    proposalId: string;
    proposal: Proposal;
  }): Promise<Proposal> {
    return await this.proposalRepository.update(proposalId, proposal);
  }
}
