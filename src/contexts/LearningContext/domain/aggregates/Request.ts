import { AggregateRoot } from "@/contexts/Shared/domain/AgregateRoot";
import { RequestDescription } from "../valueObjects/RequestDescription";
import {
  RequestStatus,
  RequestStatusEnum,
} from "../valueObjects/RequestStatus";
import { RequestTitle } from "../valueObjects/RequestTitle";
import { UniqueEntityID } from "@/contexts/Shared/domain/UniqueEntityID";
import { Proposal } from "@/contexts/CoreContext/domain/entities/Proposal";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { StatusCodes } from "http-status-codes";

import { RequestCategory } from "../valueObjects/RequestCategory";
import { RequestSubcategory } from "../valueObjects/RequestSubCategory";
import { UserId } from "@/contexts/CoreContext/domain/valueObjects/UserId";
import { RequestEstimation } from "../valueObjects/RequestEstimation";
import { RequestEdited } from "../valueObjects/RequestEdited";
import { RequestLanguage } from "../valueObjects/RequestLanguage";

export interface RequestProps {
  title: RequestTitle;
  description: RequestDescription;
  language: RequestLanguage;
  category: RequestCategory;
  subcategory: RequestSubcategory;
  status: RequestStatus;
  userId: UserId;
  estimation: RequestEstimation;
  edited: RequestEdited;
  createdAt?: Date;
  updatedAt?: Date;
  proposals: Proposal[];
}

type RequestPrimitiveProps = {
  id: string;
  title: string;
  description: string;
  language: string;
  category: string;
  subcategory: string;
  status: string;
  userId: string;
  estimation: number;
  edited: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  proposals: string[];
};

export class Request extends AggregateRoot<RequestProps> {
  private constructor(props: RequestProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(props: RequestProps, id?: UniqueEntityID): Request {
    const now = new Date();
    return new Request(
      {
        ...props,
        createdAt: props.createdAt ?? now,
        updatedAt: props.updatedAt ?? now,
        proposals: props.proposals ?? [],
      },
      id
    );
  }

  public static createFromObject(
    props: RequestPrimitiveProps,
    id?: UniqueEntityID
  ): Request {
    const titleValue = RequestTitle.create(props.title);
    const descriptionValue = RequestDescription.create(props.description);
    const languageValue = RequestLanguage.create(props.language);
    const categoryValue = RequestCategory.create(props.category);
    const subcategoryValue = RequestSubcategory.create(props.subcategory);
    const statusValue = RequestStatus.create(props.status);
    const userIdValue = UserId.create(new UniqueEntityID(props.userId));
    const estimationValue = RequestEstimation.create(props.estimation);
    const editedValue = RequestEdited.create(props.edited);

    return Request.create(
      {
        title: titleValue,
        description: descriptionValue,
        language: languageValue,
        category: categoryValue,
        subcategory: subcategoryValue,
        status: statusValue,
        userId: userIdValue,
        estimation: estimationValue,
        edited: editedValue,
        createdAt: props.createdAt ?? new Date(),
        updatedAt: props.updatedAt ?? new Date(),
        proposals: [],
      },
      id
    );
  }

  public addProposal(proposal: Proposal): void {
    if (!this.props.status.isPending()) {
      throw new ApiError(
        StatusCodes.BAD_REQUEST,
        "It can't be possible to add proposals without PENDING status"
      );
    }
    this.props.proposals.push(proposal);
  }

  public acceptProposal(proposalId: UniqueEntityID): void {
    const prop = this.props.proposals.find((p) => p.id.equals(proposalId));
    if (!prop)
      throw new ApiError(StatusCodes.BAD_REQUEST, "Proposal doesn't find");
    prop.accept();

    this.props.proposals
      .filter((p) => !p.id.equals(proposalId))
      .forEach((p) => p.reject());

    this.setStatus(RequestStatus.create(RequestStatusEnum.ACCEPTED));
  }

  public rejectRemaningProposals(): void {
    this.props.proposals.forEach((p) => {
      if (!p.status.isRejected()) {
        p.reject();
      }
    });
  }

  public cancel(): void {
    if (!this.props.status.isPending()) {
      throw new ApiError(
        StatusCodes.BAD_REQUEST,
        "Only a pending requests can be cancelled"
      );
    }
    this.setStatus(RequestStatus.create(RequestStatusEnum.REJECTED));
    this.rejectRemaningProposals();
  }

  getTitle(): RequestTitle {
    return this.props.title;
  }

  getDescription(): RequestDescription {
    return this.props.description;
  }

  getStatus(): RequestStatus {
    return this.props.status;
  }

  getUserId(): UserId {
    return this.props.userId;
  }

  getCreatedAt(): Date {
    return this.props.createdAt!;
  }

  getLanguage(): RequestLanguage {
    return this.props.language;
  }

  getCategory(): RequestCategory {
    return this.props.category;
  }

  getSubcategory(): RequestSubcategory {
    return this.props.subcategory;
  }

  getEstimation(): RequestEstimation {
    return this.props.estimation;
  }

  getEdited(): RequestEdited {
    return this.props.edited;
  }

  getProposals(): Proposal[] {
    return this.props.proposals;
  }

  getUpdatedAt(): Date {
    return this.props.updatedAt!;
  }

  setTitle(newTitle: RequestTitle): void {
    this.props.title = newTitle;
    this.updateTimestamp();
  }

  setDescription(newDescription: RequestDescription): void {
    this.props.description = newDescription;
    this.updateTimestamp();
  }

  setStatus(newStatus: RequestStatus): void {
    this.props.status = newStatus;
    this.updateTimestamp();
  }

  public accept(): void {
    if (!this.props.status.isPending()) {
      throw new ApiError(
        StatusCodes.BAD_REQUEST,
        "Only pending requests can be accepted"
      );
    }
    this.setStatus(RequestStatus.create("ACCEPTED"));
  }

  public reject(): void {
    if (!this.props.status.isPending()) {
      throw new ApiError(
        StatusCodes.BAD_REQUEST,
        "Only pending requests can be rejected"
      );
    }
    this.setStatus(RequestStatus.create("REJECTED"));
  }

  private updateTimestamp(): void {
    this.props.updatedAt = new Date();
  }

  public isValid(): boolean {
    try {
      return (
        this.props.title.value.trim().length > 0 &&
        this.props.description.value.trim().length > 0 &&
        this.props.userId.getValue().toString().trim().length > 0
      );
    } catch {
      return false;
    }
  }
}
