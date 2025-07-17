/* eslint-disable @typescript-eslint/no-unused-vars */
import { inject, injectable } from "tsyringe";
import { IChatService } from "../../domain/interfaces/services/IChatService";
import { Chat } from "../../domain/aggregates/Chat";
import IUseCase from "@/contexts/LearningContext/domain/interfaces/IUseCase";

@injectable()
export class ChatService implements IChatService {
  constructor(
    @inject("CreateChatUseCase")
    private createChatUseCase: IUseCase<Chat, Chat>,
    @inject("GetChatsByUserIdUseCase")
    private getChatsByUserIdUseCase: IUseCase<string, Chat[]>
  ) {}
  async getManyByUserId(userId: string): Promise<Chat[]> {
    return await this.getChatsByUserIdUseCase.execute(userId);
  }
  get(id: string): Promise<Chat | null> {
    throw new Error("Method not implemented.");
  }
  getAll(): Promise<Chat[]> {
    throw new Error("Method not implemented.");
  }
  update(id: string, object: Chat): Promise<Chat> {
    throw new Error("Method not implemented.");
  }
  async create(chat: Chat): Promise<Chat> {
    return await this.createChatUseCase.execute(chat);
  }
  delete(id: string): Promise<string | void> {
    throw new Error("Method not implemented.");
  }
}
