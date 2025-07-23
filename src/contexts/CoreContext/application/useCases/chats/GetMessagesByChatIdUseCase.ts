import { Message } from "@/contexts/CoreContext/domain/entities/Message";
import { IMessageRepository } from "@/contexts/CoreContext/domain/interfaces/repositories/IMessageRepository";
import IUseCase from "@/contexts/LearningContext/domain/interfaces/IUseCase";
import { inject, injectable } from "tsyringe";

@injectable()
export class GetMessagesByChatIdUseCase implements IUseCase<string, Message[]> {
  constructor(
    @inject("IMessageRepository")
    private messageRepository: IMessageRepository
  ) {}
  async execute(id: string): Promise<Message[]> {
    return await this.messageRepository.findManyByChatId(id);
  }
}
