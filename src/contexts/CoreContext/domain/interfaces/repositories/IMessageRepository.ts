import { IRepository } from "@/contexts/Shared/domain/repository/IRepository";
import { Message } from "../../entities/Message";

export interface IMessageRepository extends IRepository<Message> {
  findManyByChatId(chatId: string): Promise<Message[]>;
  markChatMessagesAsRead(chatId: string, userId: string): Promise<void>;
}
