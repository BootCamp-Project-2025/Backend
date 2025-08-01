import { Chat } from "@/contexts/CoreContext/domain/aggregates/Chat";
import { IChatRepository } from "@/contexts/CoreContext/domain/interfaces/repositories/IChatRepository";
import IUseCase from "@/contexts/LearningContext/domain/interfaces/IUseCase";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { StatusCodes } from "http-status-codes";
import { inject, injectable } from "tsyringe";

@injectable()
export class UpdateChatUseCase
  implements IUseCase<{ chatId: string; chat: Chat }, Chat>
{
  constructor(
    @inject("IChatRepository")
    private chatRepository: IChatRepository
  ) {}

  async execute(
    params: { chatId: string; chat: Chat } | undefined
  ): Promise<Chat> {
    if (!params)
      throw new ApiError(StatusCodes.BAD_REQUEST, "Missing chat data");
    return await this.chatRepository.update(params.chatId, params.chat);
  }
}
