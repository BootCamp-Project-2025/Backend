import { Proposal } from "@/contexts/CoreContext/domain/entities/Proposal";
import { ProposalRepository } from "@/contexts/CoreContext/infrastructure/persistence/ProposalRepository";
import IUseCase from "@/contexts/LearningContext/domain/interfaces/IUseCase";
import { inject, injectable } from "tsyringe";

@injectable()
export class GetProposalByChatIdUseCase implements IUseCase<string, Proposal> {
  constructor(
    @inject("IProposalRepository")
    private proposalRepository: ProposalRepository
  ) {}

  async execute(chatId: string): Promise<Proposal> {
    return await this.proposalRepository.getByChatId(chatId);
  }
}
