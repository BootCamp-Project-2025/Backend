import { Message } from "@/contexts/CoreContext/domain/entities/Message";
import { IMessageRepository } from "@/contexts/CoreContext/domain/interfaces/repositories/IMessageRepository";
import IUseCase from "@/contexts/LearningContext/domain/interfaces/IUseCase";
import { inject, injectable } from "tsyringe";

@injectable()
export class CreateMessageUseCase implements IUseCase<Message, Message> {
  constructor(
    @inject("IMessageRepository")
    private messageRepository: IMessageRepository
  ) {}

  async execute(message: Message): Promise<Message> {
    return this.messageRepository.create(message);
  }
}
