import { IMessageController } from "@/contexts/CoreContext/domain/interfaces/controllers/IMessageController";
import { MessageDto } from "@/contexts/CoreContext/domain/interfaces/dtos/IMessageDto";
import { IMessageService } from "@/contexts/CoreContext/domain/interfaces/services/IMessageService";
import { MessageMapper } from "@/contexts/CoreContext/mappers/MessageMapper";
import { ResponseService } from "@/contexts/Shared/application/services/ResponseService";
import { SuccessResponseEntity } from "@/contexts/Shared/domain/entity/SuccessResponseEntity";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { inject, injectable } from "tsyringe";

@injectable()
export class MessageController implements IMessageController {
  constructor(
    @inject("IMessageService")
    private messageService: IMessageService
  ) {}
  create = async (req: Request, res: Response): Promise<void> => {
    try {
      const messageDto = req.body as MessageDto;
      const messageDomain = MessageMapper.DtoToDomain(messageDto);
      const newMessageDomain = await this.messageService.create(messageDomain);
      const newMessageDto = MessageMapper.DomainToDto(newMessageDomain);
      const response = new SuccessResponseEntity(
        newMessageDto,
        StatusCodes.CREATED,
        "Message saved successfully"
      );
      ResponseService.send(res, response);
    } catch (error) {
      console.log(error);
      throw new ApiError();
    }
  };
  getMessagesByChatId = async (req: Request, res: Response): Promise<void> => {
    try {
      const { chatId } = req.params;
      if (!chatId)
        throw new ApiError(StatusCodes.BAD_REQUEST, "Chat id is missing");
      const messagesDomain = await this.messageService.getManyByChatId(chatId);
      const messagesDto = MessageMapper.ManyDomainToDto(messagesDomain);
      const response = new SuccessResponseEntity(
        messagesDto,
        StatusCodes.OK,
        "Messages retrieved successfully"
      );
      ResponseService.send(res, response);
    } catch (error) {
      console.log(error);
      throw new ApiError();
    }
  };
  updateMessageStatus = async (req: Request, res: Response): Promise<void> => {
    try {
      const { chatId, userId } = req.params;
      await this.messageService.markManyAsRead(chatId, userId);
      const response = new SuccessResponseEntity(
        null,
        StatusCodes.NO_CONTENT,
        "Messages marked as read successfully"
      );
      ResponseService.send(res, response);
    } catch (error) {
      console.log(error);
      throw new ApiError();
    }
  };
}
