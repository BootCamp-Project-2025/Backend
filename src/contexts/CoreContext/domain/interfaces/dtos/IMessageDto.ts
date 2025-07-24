import { MessageStatus, MessageType } from "../../entities/Message";

export interface MessageDto {
  id?: string;
  content: string;
  type: MessageType;
  timestamp: Date;
  senderId: string;
  receiversIds?: string[];
  status: MessageStatus;
  chatId: string;
}
