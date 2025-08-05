import { Chat } from "../../aggregates/Chat";

export interface IChatRepository {
  findManyByUserId(userId: string): Promise<Chat[]>;
  getById(id: string): Promise<Chat | null>;
  create(object: Chat): Promise<Chat>;
  update(id: string, object: Chat): Promise<Chat>;
}
