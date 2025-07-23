import { Chat } from "@/contexts/CoreContext/domain/aggregates/Chat";
import { IChatRepository } from "@/contexts/CoreContext/domain/interfaces/repositories/IChatRepository";
import IUseCase from "@/contexts/LearningContext/domain/interfaces/IUseCase";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { StatusCodes } from "http-status-codes";
import { inject, injectable } from "tsyringe";

@injectable()
export class GetChatByIdUseCase implements IUseCase<string, Chat> {
  constructor(
    @inject("IChatRepository")
    private chatRepository: IChatRepository
  ) {}
  async execute(id: string): Promise<Chat> {
    const chat = await this.chatRepository.getById(id);
    if (!chat) throw new ApiError(StatusCodes.NOT_FOUND, "Chat not found");
    return chat;
  }
}
