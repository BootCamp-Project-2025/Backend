import { IRepository } from "@/contexts/Shared/domain/repository/IRepository";
import { Chat } from "../../aggregates/Chat";

export interface IChatRepository extends IRepository<Chat> {
  findManyByUserId(userId: string): Promise<Chat[]>;
}
