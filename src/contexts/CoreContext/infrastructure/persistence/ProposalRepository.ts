import { injectable } from "tsyringe";
import { IProposalReposisory } from "../../domain/interfaces/repositories/IProposalRepository";
import { Proposal } from "../../domain/entities/Proposal";
import PrismaClient from "@/contexts/Shared/infrastructure/database/PrismaClient";
import ProposalMapper from "../../mappers/ProposalMapper";
import { ProposalDto } from "../../domain/interfaces/dtos/ProposalDto";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";

@injectable()
export class ProposalRepository implements IProposalReposisory {
  async create(proposal: Proposal): Promise<Proposal> {
    try {
      const newProposal = await PrismaClient.proposal.create({
        data: {
          request: { connect: { id: proposal.requestId.toString() } },
          user: { connect: { id: proposal.userId.toString() } },
          description: proposal.description,
          sessions: proposal.sessions,
          chatId: proposal.chatId?.toString(),
          status: "NEW",
        },
      });
      const newProposalDomain = ProposalMapper.dtoToDomain(
        newProposal as ProposalDto
      );
      return newProposalDomain;
    } catch (error) {
      console.log(error);
      throw new ApiError();
    }
  }
  async update(proposalId: string, proposal: Proposal): Promise<Proposal> {
    try {
      const updatedProposal = await PrismaClient.proposal.update({
        where: { id: proposalId },
        data: {
          description: proposal.description,
          sessions: proposal.sessions,
          status: proposal.status.value,
        },
      });
      const updatedProposalDomain = ProposalMapper.dtoToDomain(
        updatedProposal as ProposalDto
      );
      return updatedProposalDomain;
    } catch (error) {
      console.log(error);
      throw new ApiError();
    }
  }
  async getByChatId(chatId: string): Promise<Proposal> {
    try {
      const proposal = await PrismaClient.proposal.findFirstOrThrow({
        where: { chatId: chatId },
      });
      const proposalDomain = ProposalMapper.dtoToDomain(
        proposal as ProposalDto
      );
      return proposalDomain;
    } catch (error) {
      console.log(error);
      throw new ApiError();
    }
    throw new Error("Method not implemented.");
  }
}
