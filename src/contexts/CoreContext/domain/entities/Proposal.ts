import { UniqueEntityID } from "@/contexts/Shared/domain/UniqueEntityID";
import { Content } from "../valueObjects/Content";
import { CreationDate } from "../valueObjects/CreationDate";
import {
  ProposalStatus,
  ProposalStatusEnum,
} from "../valueObjects/ProposalStatus";
import { Entity } from "@/contexts/Shared/domain/Entity";
import { UserId } from "../valueObjects/UserId";

export interface ProposalProps {
  content: Content;
  status: ProposalStatus;
  creationDate: CreationDate;
  userId: UserId;
}

export class Proposal extends Entity<ProposalProps> {
  private constructor(props: ProposalProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(props: ProposalProps, id?: UniqueEntityID): Proposal {
    if (!props.content) {
      throw new Error("Content is required");
    }

    return new Proposal(props, id);
  }

  public reject() {
    this.props.status = ProposalStatus.create(ProposalStatusEnum.REJECTED);
  }

  public accept() {
    this.props.status = ProposalStatus.create(ProposalStatusEnum.ACCEPTED);
  }

  get id(): UniqueEntityID {
    return this._id;
  }

  get userId(): UserId {
    return this.props.userId;
  }

  get status(): ProposalStatus {
    return this.props.status;
  }

  get content(): Content {
    return this.props.content;
  }

  get creationDate(): CreationDate {
    return this.props.creationDate;
  }
}
