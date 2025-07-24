import { ProposalStatusEnum } from "../../valueObjects/ProposalStatus";

export type ProposalDto = {
  id?: string;
  content?: string;
  status?: ProposalStatusEnum;
  creationDate?: Date;
  userId?: string;
};

export class ProposalBuilder {
  dto: ProposalDto;
  constructor() {
    this.dto = {};
  }
  static builder() {
    return new ProposalBuilder();
  }

  id(id: string) {
    this.dto.id = id;
    return this;
  }

  content(content: string) {
    this.dto.content = content;
    return this;
  }
  status(status: ProposalStatusEnum) {
    this.dto.status = status;
    return this;
  }
  creationDate(creationDate: Date) {
    this.dto.creationDate = creationDate;
    return this;
  }
  userId(userId: string) {
    this.dto.userId = userId;
    return this;
  }

  build() {
    return this.dto;
  }
}
