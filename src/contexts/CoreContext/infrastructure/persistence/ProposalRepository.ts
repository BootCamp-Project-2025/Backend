import { injectable } from "tsyringe";
import { IProposalReposisory } from "../../domain/interfaces/repositories/IProposalRepository";
import { Proposal } from "../../domain/entities/Proposal";
import PrismaClient from "@/contexts/Shared/infrastructure/database/PrismaClient";
import ProposalMapper from "../../mappers/ProposalMapper";
import { ProposalDto } from "../../domain/interfaces/dtos/ProposalDto";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { StatusCodes } from "http-status-codes";
import { ChatStatus } from "@/generated/prisma";

@injectable()
export class ProposalRepository implements IProposalReposisory {
  async create(proposal: Proposal): Promise<Proposal> {
    try {
      await PrismaClient.user.findUniqueOrThrow({
        where: { id: proposal.userId.toString() },
      });
      if (proposal.chatId)
        await PrismaClient.chat.findUniqueOrThrow({
          where: { id: proposal.chatId.toString() },
        });
      await PrismaClient.request.findUniqueOrThrow({
        where: { id: proposal.requestId.toString() },
      });
      const newProposal = await PrismaClient.proposal.create({
        data: {
          request: { connect: { id: proposal.requestId.toString() } },
          user: { connect: { id: proposal.userId.toString() } },
          description: proposal.description,
          sessions: proposal.sessions,
          chatId: proposal.chatId?.toString(),
          status: "NEW",
        },
        include: {
          request: {
            include: { proposals: true },
          },
        },
      });
      const newProposalDomain = ProposalMapper.dtoToDomain(
        newProposal as ProposalDto
      );
      return newProposalDomain;
    } catch (error) {
      console.log(error);
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === "P2025"
      ) {
        throw new ApiError(
          StatusCodes.NOT_FOUND,
          `${error.meta?.modelName ?? "Resource"} not found`
        );
      } else {
        throw new ApiError();
      }
    }
  }
  async update(proposalId: string, proposal: Proposal): Promise<Proposal> {
    try {
      if (proposal.status.value === "ACCEPTED") {
        const requestDb = await PrismaClient.request.update({
          where: { id: proposal.requestId.toValue() },
          data: {
            status: "ACCEPTED",
            proposals: {
              updateMany: {
                where: { requestId: proposal.requestId.toString() },
                data: { status: "REJECTED" },
              },
            },
          },
          include: { proposals: true },
        });

        const chatIds = requestDb.proposals
          .map((p) => p.chatId)
          .filter((id): id is string => !!id);

        await PrismaClient.chat.updateMany({
          where: { id: { in: chatIds } },
          data: { status: ChatStatus.CLOSED },
        });
      }

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
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === "P2025"
      ) {
        throw new ApiError(
          StatusCodes.NOT_FOUND,
          `${error.meta?.modelName ?? "Resource"} not found`
        );
      } else {
        throw new ApiError();
      }
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
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === "P2025"
      ) {
        throw new ApiError(
          StatusCodes.NOT_FOUND,
          `${error.meta?.modelName ?? "Resource"} not found`
        );
      } else {
        throw new ApiError();
      }
    }
  }
  async findAllByUserId(userId: string): Promise<Proposal[]> {
    try {
      const proposalsDb = await PrismaClient.proposal.findMany({
        where: { userId },
        include: {
          request: true,
          user: true,
        },
      });
      return ProposalMapper.bulkDtoToDomain(proposalsDb as ProposalDto[]);
    } catch (error) {
      console.log(error);
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === "P2025"
      ) {
        throw new ApiError(
          StatusCodes.NOT_FOUND,
          `${error.meta?.modelName ?? "Resource"} not found`
        );
      } else {
        throw new ApiError();
      }
    }
  }
}
