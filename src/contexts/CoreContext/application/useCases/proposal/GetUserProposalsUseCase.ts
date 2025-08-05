import { Proposal } from "@/contexts/CoreContext/domain/entities/Proposal";
import { ProposalRepository } from "@/contexts/CoreContext/infrastructure/persistence/ProposalRepository";
import IUseCase from "@/contexts/LearningContext/domain/interfaces/IUseCase";
import { inject, injectable } from "tsyringe";

@injectable()
export default class GetUserProposalsUseCase
  implements IUseCase<string, Proposal[]>
{
  constructor(
    @inject("IProposalRepository")
    private readonly repository: ProposalRepository
  ) {}

  async execute(userId: string): Promise<Proposal[]> {
    return await this.repository.findAllByUserId(userId);
  }
}
