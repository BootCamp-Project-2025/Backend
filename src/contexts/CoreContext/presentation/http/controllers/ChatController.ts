import { IChatController } from "@/contexts/CoreContext/domain/interfaces/controllers/IChatController";
import { ChatDto } from "@/contexts/CoreContext/domain/interfaces/dtos/IChatDto";
import { IChatService } from "@/contexts/CoreContext/domain/interfaces/services/IChatService";
import { ChatMapper } from "@/contexts/CoreContext/mappers/ChatMapper";
import { ResponseService } from "@/contexts/Shared/application/services/ResponseService";
import { SuccessResponseEntity } from "@/contexts/Shared/domain/entity/SuccessResponseEntity";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { inject, injectable } from "tsyringe";

@injectable()
export class ChatController implements IChatController {
  constructor(
    @inject("IChatService")
    private chatService: IChatService
  ) {}
  create = async (req: Request, res: Response): Promise<void> => {
    const chat = req.body as ChatDto;
    const chatDto: ChatDto = { ...chat, messages: [] };
    const chatDomain = ChatMapper.DtoToDomain(chatDto);
    const newChatDomain = await this.chatService.create(chatDomain);
    const newChatDto = ChatMapper.DomainToDto(newChatDomain);
    const response = new SuccessResponseEntity(
      newChatDto,
      StatusCodes.CREATED,
      "Chat saved successfully"
    );
    ResponseService.send(res, response);
  };
  get = async (req: Request, res: Response): Promise<void> => {
    const { chatId } = req.params;
    const chatDomain = await this.chatService.get(chatId);
    if (!chatDomain)
      throw new ApiError(StatusCodes.NOT_FOUND, "Chat not found");
    const chatDto = ChatMapper.DomainToDto(chatDomain);
    const response = new SuccessResponseEntity(
      chatDto,
      StatusCodes.OK,
      "Chat retrieved successfully"
    );
    ResponseService.send(res, response);
  };
  update = async (req: Request, res: Response): Promise<void> => {
    const { chatId } = req.params;
    const chatDto = { ...req.body, messages: [] } as ChatDto;
    const chatDomain = ChatMapper.DtoToDomain(chatDto);
    const updatedChatDomain = await this.chatService.update(chatId, chatDomain);
    if (!updatedChatDomain)
      throw new ApiError(StatusCodes.NOT_FOUND, "Chat not found");
    const updatedChatDto = ChatMapper.DomainToDto(updatedChatDomain);
    const response = new SuccessResponseEntity(
      updatedChatDto,
      StatusCodes.OK,
      "Chat updated successfully"
    );
    ResponseService.send(res, response);
  };
}
