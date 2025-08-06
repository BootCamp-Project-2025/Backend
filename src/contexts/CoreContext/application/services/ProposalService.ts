import { inject, injectable } from "tsyringe";
import { IProposalService } from "../../domain/interfaces/services/IProposalService";
import IUseCase from "@/contexts/LearningContext/domain/interfaces/IUseCase";
import { Proposal } from "../../domain/entities/Proposal";

@injectable()
export class ProposalService implements IProposalService {
  constructor(
    @inject("CreateProposalUseCase")
    private createProposalUseCase: IUseCase<Proposal, Proposal>,
    @inject("GetProposalByChatIdUseCase")
    private getProposalByChatIdUseCase: IUseCase<string, Proposal>,
    @inject("UpdateProposalUseCase")
    private updateProposalUseCase: IUseCase<
      { proposalId: string; proposal: Proposal },
      Proposal
    >,
    @inject("GetUserProposalsUseCase")
    private getUserProposalsUseCase: IUseCase<string, Proposal[]>
  ) {}
  async create(proposal: Proposal): Promise<Proposal> {
    return await this.createProposalUseCase.execute(proposal);
  }
  async getByChatId(chatId: string): Promise<Proposal> {
    return await this.getProposalByChatIdUseCase.execute(chatId);
  }
  async update(proposalId: string, proposal: Proposal): Promise<Proposal> {
    return await this.updateProposalUseCase.execute({ proposalId, proposal });
  }
  async getByUserId(userId: string): Promise<Proposal[]> {
    return await this.getUserProposalsUseCase.execute(userId);
  }
}
