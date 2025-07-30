import { Proposal } from "../../entities/Proposal";

export interface IProposalReposisory {
  create(proposal: Proposal): Promise<Proposal>;
  update(proposalId: string, proposal: Proposal): Promise<Proposal>;
  getByChatId(chatId: string): Promise<Proposal>;
}
