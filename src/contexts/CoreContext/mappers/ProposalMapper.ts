import { UniqueEntityID } from "@/contexts/Shared/domain/UniqueEntityID";
import { Proposal } from "../domain/entities/Proposal";
import {
  ProposalBuilder,
  ProposalDto,
} from "../domain/interfaces/dtos/ProposalDto";
import { Content } from "../domain/valueObjects/Content";
import { CreationDate } from "../domain/valueObjects/CreationDate";
import { ProposalStatus } from "../domain/valueObjects/ProposalStatus";
import { UserId } from "../domain/valueObjects/UserId";

const ProposalMapper = {
  dtoToDomain(proposalDto: ProposalDto): Proposal {
    return Proposal.create({
      content: Content.create(proposalDto.content),
      status: ProposalStatus.create(proposalDto.status),
      creationDate: CreationDate.create(proposalDto.creationDate),
      userId: UserId.create(new UniqueEntityID(proposalDto.userId)),
    });
  },

  bulkDomainToDto(proposalList: Proposal[]): ProposalDto[] {
    return proposalList.map((proposal) => ProposalMapper.DomainToDto(proposal));
  },

  DomainToDto(proposal: Proposal): ProposalDto {
    return ProposalBuilder.builder()
      .id(proposal.id.toValue())
      .content(proposal.content.value)
      .status(proposal.status.value)
      .creationDate(proposal.creationDate.value)
      .userId(proposal.userId.getValue().toValue())
      .build();
  },
};
export default ProposalMapper;
