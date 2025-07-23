import { IMessageRepository } from "@/contexts/CoreContext/domain/interfaces/repositories/IMessageRepository";
import IUseCase from "@/contexts/LearningContext/domain/interfaces/IUseCase";
import { inject, injectable } from "tsyringe";

@injectable()
export class UpdateMessageStatusUseCase
  implements IUseCase<{ chatId: string; userId: string }, void>
{
  constructor(
    @inject("IMessageRepository")
    private messageRepository: IMessageRepository
  ) {}
  async execute(params: { chatId: string; userId: string }): Promise<void> {
    await this.messageRepository.markChatMessagesAsRead(
      params.chatId,
      params.userId
    );
  }
}
