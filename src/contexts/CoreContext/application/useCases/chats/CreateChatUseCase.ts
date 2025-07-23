import { IChatRepository } from "@/contexts/CoreContext/domain/interfaces/repositories/IChatRepository";
import IUseCase from "@/contexts/LearningContext/domain/interfaces/IUseCase";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { StatusCodes } from "http-status-codes";
import { inject, injectable } from "tsyringe";
import { Chat } from "@/contexts/CoreContext/domain/aggregates/Chat";

@injectable()
export class CreateChatUsecase implements IUseCase<Chat, Chat> {
  constructor(
    @inject("IChatRepository")
    private chatRepository: IChatRepository
  ) {}

  async execute(chat: Chat): Promise<Chat> {
    const createdChat = await this.chatRepository.create(chat);
    if (!createdChat) {
      throw new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "Failed to create chat"
      );
    }
    return createdChat;
  }
}
