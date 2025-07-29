import { ProposalDto } from "./ProposalDto";

export type RequestDto = {
  id?: string;
  title?: string;
  description?: string;
  language?: string;
  category?: string;
  subCategory?: string;
  status?: string;
  userId?: string;
  estimation?: number;
  edited?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  proposals?: ProposalDto[];
};

export default class RequestDtoBuilder {
  dto: RequestDto;
  private constructor() {
    this.dto = {};
  }

  static builder(): RequestDtoBuilder {
    return new RequestDtoBuilder();
  }

  build(): RequestDto {
    return this.dto;
  }

  id(id: string): RequestDtoBuilder {
    this.dto.id = id;
    return this;
  }

  title(title: string): RequestDtoBuilder {
    this.dto.title = title;
    return this;
  }
  description(description: string): RequestDtoBuilder {
    this.dto.description = description;
    return this;
  }
  language(language: string): RequestDtoBuilder {
    this.dto.language = language;

    return this;
  }
  category(category: string): RequestDtoBuilder {
    this.dto.category = category;
    return this;
  }
  subcategory(subCategory: string): RequestDtoBuilder {
    this.dto.subCategory = subCategory;
    return this;
  }
  status(status: string): RequestDtoBuilder {
    this.dto.status = status;
    return this;
  }
  userId(userId: string): RequestDtoBuilder {
    this.dto.userId = userId;
    return this;
  }
  estimation(estimation: number): RequestDtoBuilder {
    this.dto.estimation = estimation;
    return this;
  }
  edited(edited: boolean): RequestDtoBuilder {
    this.dto.edited = edited;
    return this;
  }
  createdAt(createdAt: Date): RequestDtoBuilder {
    this.dto.createdAt = createdAt;
    return this;
  }
  updatedAt(updatedAt: Date): RequestDtoBuilder {
    this.dto.updatedAt = updatedAt;
    return this;
  }
  proposals(proposals: ProposalDto[]): RequestDtoBuilder {
    this.dto.proposals = proposals;
    return this;
  }
}
