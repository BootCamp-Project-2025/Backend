import { Proposal } from "../../entities/Proposal";

export interface IProposalService {
  create(proposal: Proposal): Promise<Proposal>;
  getByChatId(chatId: string): Promise<Proposal>;
  update(proposalId: string, proposal: Proposal): Promise<Proposal>;
  getByUserId(userId: string): Promise<Proposal[]>;
}
