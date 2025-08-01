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
    private getChatsByUserIdUseCase: IUseCase<string, Chat[]>,
    @inject("GetChatByIdUseCase")
    private getChatByIdUseCase: IUseCase<string, Chat>,
    @inject("UpdateChatUseCase")
    private updateChatUseCase: IUseCase<{ chatId: string; chat: Chat }, Chat>
  ) {}
  async getManyByUserId(userId: string): Promise<Chat[]> {
    return await this.getChatsByUserIdUseCase.execute(userId);
  }
  async get(id: string): Promise<Chat> {
    return await this.getChatByIdUseCase.execute(id);
  }
  getAll(): Promise<Chat[]> {
    throw new Error("Method not implemented.");
  }
  async update(id: string, object: Chat): Promise<Chat> {
    return await this.updateChatUseCase.execute({ chatId: id, chat: object });
  }
  async create(chat: Chat): Promise<Chat> {
    return await this.createChatUseCase.execute(chat);
  }
  delete(id: string): Promise<string | void> {
    throw new Error("Method not implemented.");
  }
}
