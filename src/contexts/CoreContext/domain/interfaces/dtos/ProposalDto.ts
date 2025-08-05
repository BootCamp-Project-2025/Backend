import { ProposalStatusEnum } from "../../valueObjects/ProposalStatus";

export type ProposalDto = {
  id?: string;
  requestId?: string;
  userId?: string;
  description?: string;
  sessions?: string[];
  createdAt?: Date;
  chatId?: string;
  status?: ProposalStatusEnum;
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
  requestId(requestId: string) {
    this.dto.requestId = requestId;
    return this;
  }
  userId(userId: string) {
    this.dto.userId = userId;
    return this;
  }
  description(description: string) {
    this.dto.description = description;
    return this;
  }
  sessions(sessions: string[]) {
    this.dto.sessions = sessions;
    return this;
  }
  createdAt(createdAt: Date) {
    this.dto.createdAt = createdAt;
    return this;
  }
  chatId(chatId: string) {
    this.dto.chatId = chatId;
    return this;
  }
  status(status: ProposalStatusEnum) {
    this.dto.status = status;
    return this;
  }
  build() {
    return this.dto;
  }
}
