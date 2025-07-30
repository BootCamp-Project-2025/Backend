import { UniqueEntityID } from "@/contexts/Shared/domain/UniqueEntityID";
// import { Content } from "../valueObjects/Content";
// import { CreationDate } from "../valueObjects/CreationDate";
import {
  ProposalStatus,
  ProposalStatusEnum,
} from "../valueObjects/ProposalStatus";
import { Entity } from "@/contexts/Shared/domain/Entity";
// import { UserId } from "../valueObjects/UserId";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { StatusCodes } from "http-status-codes";

export interface ProposalProps {
  requestId: UniqueEntityID;
  userId: UniqueEntityID;
  description: string;
  sessions: string[];
  createdAt: Date;
  chatId?: UniqueEntityID;
  status: ProposalStatus;
}

export class Proposal extends Entity<ProposalProps> {
  private constructor(props: ProposalProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(props: ProposalProps, id?: UniqueEntityID): Proposal {
    if (!props.description) {
      throw new ApiError(StatusCodes.BAD_REQUEST, "Description is required");
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

  get requestId(): UniqueEntityID {
    return this.props.requestId;
  }

  get userId(): UniqueEntityID {
    return this.props.userId;
  }

  get sessions(): string[] {
    return this.props.sessions;
  }

  get chatId(): UniqueEntityID | undefined {
    return this.props.chatId;
  }

  get status(): ProposalStatus {
    return this.props.status;
  }

  get description(): string {
    return this.props.description;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }
}
