import { Entity } from "@/contexts/Shared/domain/Entity";
import { UniqueEntityID } from "@/contexts/Shared/domain/UniqueEntityID";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { MessageStatus as MessageStatusPrisma } from "@/generated/prisma";
import { MessageType as MessageTypePrisma } from "@/generated/prisma";
import { StatusCodes } from "http-status-codes";

export type MessageType = "TEXT";

export type MessageStatus = "SENT" | "DELIVERED" | "READ" | "FAILED";

export interface MessageProps {
  content: string;
  type: MessageType;
  timestamp: Date;
  status: MessageStatus;
  senderId: UniqueEntityID;
  chatId: UniqueEntityID;
  receiversIds: UniqueEntityID[];
}

export class Message extends Entity<MessageProps> {
  constructor(props: MessageProps, id: UniqueEntityID) {
    super(props, id);
  }

  public static create(props: MessageProps, id: UniqueEntityID): Message {
    if (!props.content) {
      throw new ApiError(StatusCodes.BAD_REQUEST, "Message must have content");
    }
    if (!props.senderId) {
      throw new ApiError(StatusCodes.BAD_REQUEST, "Sender not defined");
    }
    if (!props.chatId) {
      throw new ApiError(StatusCodes.BAD_REQUEST, "Chat not defined");
    }
    if (props.status) {
      const statusIsValid = Object.values(MessageStatusPrisma).includes(
        props.status as MessageStatusPrisma
      );
      if (!statusIsValid)
        throw new ApiError(StatusCodes.BAD_REQUEST, "Unknown message status");
    }
    if (!props.type)
      throw new ApiError(StatusCodes.BAD_REQUEST, "Type is not defined");
    const typeIsValid = Object.values(MessageTypePrisma).includes(
      props.type as MessageTypePrisma
    );
    if (!typeIsValid)
      throw new ApiError(StatusCodes.BAD_REQUEST, "Unknown message type");
    return new Message(
      {
        ...props,
        status: props.status ?? "SENT",
        timestamp: props.timestamp ?? new Date(),
      },
      id
    );
  }
  get id(): UniqueEntityID {
    return this._id;
  }
  get content(): string {
    return this.props.content;
  }
  get type(): MessageType {
    return this.props.type;
  }
  get timestamp(): Date {
    return this.props.timestamp;
  }
  get status(): MessageStatus {
    return this.props.status;
  }
  get senderId(): UniqueEntityID {
    return this.props.senderId;
  }
  get chatId(): UniqueEntityID {
    return this.props.chatId;
  }
  get receiversIds(): UniqueEntityID[] {
    return this.props.receiversIds;
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
