import { AggregateRoot } from "@/contexts/Shared/domain/AgregateRoot";
import { ChatName } from "../valueObjects/ChatName";
import { UniqueEntityID } from "@/contexts/Shared/domain/UniqueEntityID";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { StatusCodes } from "http-status-codes";
import { Message } from "../entities/Message";

export type ChatStatus = "ACTIVE" | "CLOSED" | "PROPOSAL" | "P2P";

export interface ChatProps {
  name?: ChatName;
  createdAt?: Date;
  messages: Message[];
  participantsIds: UniqueEntityID[];
  status: ChatStatus;
}

export class Chat extends AggregateRoot<ChatProps> {
  constructor(props: ChatProps, id?: UniqueEntityID) {
    super(props, id);
  }

  get chatName() {
    return this.props.name;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get messages() {
    return this.props.messages;
  }

  get participantsIds() {
    return this.props.participantsIds;
  }

  get status() {
    return this.props.status;
  }

  public static create(props: ChatProps, id?: UniqueEntityID): Chat {
    const participantsIds = [
      ...new Set(props.participantsIds.map((id) => id.toString())),
    ];
    if (participantsIds.length < 2) {
      throw new ApiError(
        StatusCodes.BAD_REQUEST,
        "Chat must have at least 2 participants"
      );
    }
    return new Chat(
      {
        name: props.name ?? ChatName.create(""),
        createdAt: props.createdAt ?? new Date(),
        messages: props.messages ?? [],
        status: props.status,
        participantsIds: props.participantsIds,
      },
      id
    );
  }

  public setChatName(name: string): void {
    this.props.name = ChatName.create(name);
  }

  public addMessage(message: Message): void {
    this.props.messages.push(message);
  }

  public addParticipant(participantId: UniqueEntityID): void {
    this.props.participantsIds.push(participantId);
  }
}
