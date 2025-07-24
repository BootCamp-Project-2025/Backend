import { Chat } from "@/contexts/CoreContext/domain/aggregates/Chat";
import { IChatRepository } from "@/contexts/CoreContext/domain/interfaces/repositories/IChatRepository";
import IUseCase from "@/contexts/LearningContext/domain/interfaces/IUseCase";
import { inject, injectable } from "tsyringe";

@injectable()
export class GetChatsByUserIdUseCase implements IUseCase<string, Chat[]> {
  constructor(
    @inject("IChatRepository")
    private chatRepository: IChatRepository
  ) {}
  async execute(userId: string): Promise<Chat[]> {
    return await this.chatRepository.findManyByUserId(userId);
  }
}
