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
    try {
      const chatDto = req.body as ChatDto;
      const chatDomain = ChatMapper.DtoToDomain(chatDto);
      const newChatDomain = await this.chatService.create(chatDomain);
      const newChatDto = ChatMapper.DomainToDto(newChatDomain);
      const response = new SuccessResponseEntity(
        newChatDto,
        StatusCodes.CREATED,
        "Chat saved successfully"
      );
      ResponseService.send(res, response);
    } catch (error) {
      console.log(error);
      throw new ApiError();
    }
  };
}
