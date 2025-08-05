import { ChatStatus } from "../../aggregates/Chat";
import { MessageDto } from "./IMessageDto";

export interface ChatDto {
  id?: string;
  name?: string;
  messages: MessageDto[];
  participantsIds: string[];
  createdAt?: Date;
  status?: ChatStatus;
}
