import { Entity } from "@/contexts/Shared/domain/Entity";
import { UniqueEntityID } from "@/contexts/Shared/domain/UniqueEntityID";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { StatusCodes } from "http-status-codes";

export type MessageType = "TEXT";

export type MessageStatus = "SENT" | "DELIVERED" | "READ" | "FAILED";

export interface MessageProps {
  content: string;
  type: MessageType;
  timestamp: Date;
  status?: MessageStatus;
  senderId: UniqueEntityID;
  chatId: UniqueEntityID;
}

export class Message extends Entity<MessageProps> {
  constructor(props: MessageProps, id: UniqueEntityID) {
    super(props, id);
  }

  public static create(props: MessageProps, id: UniqueEntityID): Message {
    if (!props.content) {
      throw new ApiError(
        StatusCodes.BAD_REQUEST,
        "Message must have a content"
      );
    }
    if (!props.senderId) {
      throw new ApiError(StatusCodes.BAD_REQUEST, "Sender not defined");
    }
    if (!props.chatId) {
      throw new ApiError(StatusCodes.BAD_REQUEST, "Chat not defined");
    }
    return new Message(
      {
        ...props,
        status: "SENT",
        timestamp: props.timestamp ?? new Date(),
      },
      id
    );
  }
  get id(): UniqueEntityID {
    return this._id;
  }
  get content(): string {
    return this.content;
  }
  get type(): MessageType {
    return this.type;
  }
  get timestamp(): Date {
    return this.timestamp;
  }
  get status(): MessageStatus {
    return this.status;
  }
  get senderId(): UniqueEntityID {
    return this.senderId;
  }
  get chatId(): UniqueEntityID {
    return this.chatId;
  }
  public updateContent(content: string): void {
    this.props.content = content;
  }
  public updateType(type: MessageType): void {
    this.props.type = type;
  }
  public updateStatus(status: MessageStatus): void {
    this.props.status = status;
  }
  public toString(): string {
    return `[${this.timestamp} | ${this.type} | ${this.status}] ${this.senderId} > ${this.chatId}: ${this.content}`;
  }
}
