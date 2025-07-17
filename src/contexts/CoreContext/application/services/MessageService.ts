/* eslint-disable @typescript-eslint/no-unused-vars */
import { inject, injectable } from "tsyringe";
import { IMessageService } from "../../domain/interfaces/services/IMessageService";
import IUseCase from "@/contexts/LearningContext/domain/interfaces/IUseCase";
import { Message } from "../../domain/entities/Message";

@injectable()
export class MessageService implements IMessageService {
  constructor(
    @inject("CreateMessageUseCase")
    private createMessageUseCase: IUseCase<Message, Message>,
    @inject("GetMessagesByChatIdUseCase")
    private getMessagesByChatIdUseCase: IUseCase<string, Message[]>,
    @inject("UpdateMessageStatusUseCase")
    private UpdateMessageStatusUseCase: IUseCase<
      { chatId: string; userId: string },
      void
    >
  ) {}
  async getManyByChatId(chatId: string): Promise<Message[]> {
    return await this.getMessagesByChatIdUseCase.execute(chatId);
  }
  async markManyAsRead(chatId: string, userId: string): Promise<void> {
    return await this.UpdateMessageStatusUseCase.execute({ chatId, userId });
  }
  get(id: string): Promise<Message | null> {
    throw new Error("Method not implemented.");
  }
  getAll(): Promise<Message[]> {
    throw new Error("Method not implemented.");
  }
  update(id: string, object: Message): Promise<Message> {
    throw new Error("Method not implemented.");
  }
  async create(message: Message): Promise<Message> {
    return await this.createMessageUseCase.execute(message);
  }
  delete(id: string): Promise<string | void> {
    throw new Error("Method not implemented.");
  }
}
