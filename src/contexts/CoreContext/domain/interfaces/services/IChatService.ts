import { IService } from "@/contexts/Shared/domain/service/IService";
import { Chat } from "../../aggregates/Chat";

export interface IChatService extends IService<Chat> {
  getManyByUserId(userId: string): Promise<Chat[]>;
}
