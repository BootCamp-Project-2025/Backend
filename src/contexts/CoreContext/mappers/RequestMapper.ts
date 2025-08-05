import { UniqueEntityID } from "@/contexts/Shared/domain/UniqueEntityID";
import { $Enums, Request as PrismaRequest } from "@/generated/prisma";
import { Request } from "../domain/aggregates/Request";
import RequestDtoBuilder, {
  RequestDto,
} from "../domain/interfaces/dtos/RequestDto";
import { RequestCategory } from "../domain/valueObjects/request/RequestCategory";
import { RequestDescription } from "../domain/valueObjects/request/RequestDescription";
import { RequestEdited } from "../domain/valueObjects/request/RequestEdited";
import { RequestEstimation } from "../domain/valueObjects/request/RequestEstimation";
import { RequestLanguage } from "../domain/valueObjects/request/RequestLanguage";
import { RequestStatus } from "../domain/valueObjects/request/RequestStatus";
import { RequestSubcategory } from "../domain/valueObjects/request/RequestSubCategory";
import { RequestTitle } from "../domain/valueObjects/request/RequestTitle";
import { UserId } from "../domain/valueObjects/UserId";
import ProposalMapper from "./ProposalMapper";
import { RequestIndex } from "../domain/interfaces/dtos/index/RequestIndex";

const RequestMapper = {
  bulkDtoToDomain(requestListDto: RequestDto[]): Request[] {
    return requestListDto.map((request) => this.dtoToDomain(request));
  },

  dtoToDomain(requestDto: RequestDto): Request {
    return Request.create(
      {
        title: RequestTitle.create(requestDto.title ?? ""),
        description: RequestDescription.create(requestDto.description ?? ""),
        language: RequestLanguage.create(requestDto.language ?? "english"),
        category: RequestCategory.create(requestDto.category ?? "none"),
        subcategory: RequestSubcategory.create(
          requestDto.subCategory ?? "none"
        ),
        status: RequestStatus.create(requestDto.status ?? ""),
        userId: UserId.create(new UniqueEntityID(requestDto.userId)),
        estimation: RequestEstimation.create(requestDto.estimation ?? 1),
        edited: RequestEdited.create(requestDto.edited ?? false),
        createdAt: requestDto.createdAt ?? new Date(),
        updatedAt: requestDto.updatedAt ?? new Date(),
        proposals: [],
      },
      new UniqueEntityID(requestDto.id)
    );
  },

  bulkDomainToDto(requestList: Request[]): RequestDto[] {
    return requestList.map((request) => this.domainToDto(request));
  },

  domainToDto(request: Request): RequestDto {
    return RequestDtoBuilder.builder()
      .title(request.getTitle().value)
      .description(request.getDescription().value)
      .language(request.getLanguage().value)
      .category(request.getCategory().value)
      .subcategory(request.getSubcategory().value)
      .status(request.getStatus().value)
      .userId(request.getUserId().getValue().toValue())
      .estimation(request.getEstimation().value)
      .edited(request.getEdited().value)
      .createdAt(request.getCreatedAt())
      .updatedAt(request.getUpdatedAt())
      .proposals(ProposalMapper.bulkDomainToDto(request.getProposals()))
      .build();
  },

  domainToPersistance(requestDomain: Request): PrismaRequest {
    return {
      id: requestDomain.id.toString(),
      userId: requestDomain.getUserId().getValue().toString(),
      title: requestDomain.getTitle().value,
      description: requestDomain.getDescription().value,
      language: requestDomain.getLanguage().value,
      category: requestDomain.getCategory().value,
      subCategory: requestDomain.getSubcategory().value,
      status: requestDomain.getStatus().value as $Enums.RequestStatus,
      createdAt: requestDomain.getCreatedAt(),
      estimation: requestDomain.getEstimation().value,
      edited: requestDomain.getEdited().value,
      updatedAt: requestDomain.getUpdatedAt(),
    };
  },

  domainToIndex(request: Request): RequestIndex {
    return {
      id: request.id.toString(),
      userId: request.getUserId().getValue().toString(),
      title: request.getTitle().value,
      description: request.getDescription().value,
      language: request.getLanguage().value.toLowerCase(),
      category: request.getCategory().value.toLowerCase(),
      subCategory: request.getSubcategory().value.toLowerCase(),
      createdAt: request.getCreatedAt(),
    };
  },
};

export default RequestMapper;
