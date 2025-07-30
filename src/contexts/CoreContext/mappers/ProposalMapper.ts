import { UniqueEntityID } from "@/contexts/Shared/domain/UniqueEntityID";
import { Proposal } from "../domain/entities/Proposal";
import {
  ProposalBuilder,
  ProposalDto,
} from "../domain/interfaces/dtos/ProposalDto";
import { ProposalStatus } from "../domain/valueObjects/ProposalStatus";

const ProposalMapper = {
  dtoToDomain(proposalDto: ProposalDto): Proposal {
    return Proposal.create({
      requestId: new UniqueEntityID(proposalDto.requestId),
      userId: new UniqueEntityID(proposalDto.userId),
      description: proposalDto.description ?? "",
      sessions: proposalDto.sessions ?? [],
      createdAt: proposalDto.createdAt ?? new Date(),
      status: ProposalStatus.create(proposalDto.status),
      chatId: new UniqueEntityID(proposalDto.chatId),
    });
  },

  bulkDomainToDto(proposalList: Proposal[]): ProposalDto[] {
    return proposalList.map((proposal) => ProposalMapper.DomainToDto(proposal));
  },

  DomainToDto(proposal: Proposal): ProposalDto {
    return ProposalBuilder.builder()
      .id(proposal.id.toValue())
      .userId(proposal.userId.toString())
      .requestId(proposal.requestId.toString())
      .description(proposal.description)
      .sessions(proposal.sessions)
      .createdAt(proposal.createdAt)
      .status(proposal.status.value)
      .build();
  },
};
export default ProposalMapper;
