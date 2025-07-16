import { AggregateRoot } from "@/contexts/Shared/domain/AgregateRoot";
import { RequestDescription } from "../valueObjects/request/RequestDescription";
import {
  RequestStatus,
  RequestStatusEnum,
} from "../valueObjects/request/RequestStatus";
import { RequestTitle } from "../valueObjects/request/RequestTitle";
import { UniqueEntityID } from "@/contexts/Shared/domain/UniqueEntityID";
import { Proposal } from "@/contexts/CoreContext/domain/entities/Proposal";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { StatusCodes } from "http-status-codes";

import { RequestCategory } from "../valueObjects/request/RequestCategory";
import { RequestSubcategory } from "../valueObjects/request/RequestSubCategory";
import { UserId } from "@/contexts/CoreContext/domain/valueObjects/UserId";
import { RequestEstimation } from "../valueObjects/request/RequestEstimation";
import { RequestEdited } from "../valueObjects/request/RequestEdited";
import { RequestLanguage } from "../valueObjects/request/RequestLanguage";

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
  createdAt: Date;
  updatedAt: Date;
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
  createdAt: Date;
  updatedAt: Date;
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
    this.rejectRemainingProposals(proposalId);

    this.setStatus(RequestStatus.create(RequestStatusEnum.ACCEPTED));
  }

  public rejectRemainingProposals(acceptedId?: UniqueEntityID): void {
    this.props.proposals.forEach((p) => {
      if (p.id.equals(acceptedId)) return;
      if (p.status.isPending()) {
        p.reject();
      }
    });
  }

  public accept(): void {
    if (!this.props.status.isPending()) {
      throw new ApiError(
        StatusCodes.BAD_REQUEST,
        "Only pending requests can be accepted"
      );
    }
    this.setStatus(RequestStatus.create(RequestStatusEnum.ACCEPTED));
  }

  public cancel(): void {
    if (!this.props.status.isPending()) {
      throw new ApiError(
        StatusCodes.BAD_REQUEST,
        "Only a pending requests can be cancelled"
      );
    }

    const hasAcceptedProposal = this.props.proposals.some((p) =>
      p.status.isAccepted()
    );
    if (hasAcceptedProposal) {
      throw new ApiError(
        StatusCodes.BAD_REQUEST,
        "Cannot cancel a request with an accepted proposal"
      );
    }

    this.setStatus(RequestStatus.create(RequestStatusEnum.CANCELED));
    this.rejectRemainingProposals();
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
    return this.props.createdAt;
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
    return this.props.updatedAt;
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

  private updateTimestamp(): void {
    this.props.updatedAt = new Date();
  }

  public requestEdited(): void {
    this.props.edited = RequestEdited.create(true);
    this.updateTimestamp();
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
