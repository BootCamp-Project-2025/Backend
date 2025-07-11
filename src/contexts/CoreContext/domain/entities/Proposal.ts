import { UniqueEntityID } from "@/contexts/Shared/domain/UniqueEntityID";
import { Description } from "../valueObjects/Content";
import { CreationDate } from "../valueObjects/CreationDate";
import {
  ProposalStatus,
  ProposalStatusEnum,
} from "../valueObjects/ProposalStatus";
import { Entity } from "@/contexts/Shared/domain/Entity";

export interface ProposalProps {
  content: Description;
  status: ProposalStatus;
  creationDate: CreationDate;
  freelancerId: UniqueEntityID;
  requestId: UniqueEntityID;
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

  get freelancerId(): UniqueEntityID {
    return this._id;
  }

  get requestId(): UniqueEntityID {
    return this.props.requestId;
  }

  get status(): ProposalStatus {
    return this.props.status;
  }

  get content(): Description {
    return this.props.content;
  }

  get creationDate(): CreationDate {
    return this.props.creationDate;
  }
}
