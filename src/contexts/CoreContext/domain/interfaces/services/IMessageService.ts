import { IService } from "@/contexts/Shared/domain/service/IService";
import { Message } from "../../entities/Message";

export interface IMessageService extends IService<Message> {
  getManyByChatId(chatId: string): Promise<Message[]>;
  markManyAsRead(chatId: string, userId: string): Promise<void>;
}
