import { User } from "@/contexts/CoreContext/domain/aggregates/User";
import { IUserController } from "@/contexts/CoreContext/domain/interfaces/controllers/IUserController";
import { ICreateUserDto } from "@/contexts/CoreContext/domain/interfaces/dtos/ICreateUserDto";
import { IChatService } from "@/contexts/CoreContext/domain/interfaces/services/IChatService";
import { IUserService } from "@/contexts/CoreContext/domain/interfaces/services/IUserService";
import { ChatMapper } from "@/contexts/CoreContext/mappers/ChatMapper";
import UserMapper from "@/contexts/CoreContext/mappers/UserMapper";
import { ResponseService } from "@/contexts/Shared/application/services/ResponseService";
import { SuccessResponseEntity } from "@/contexts/Shared/domain/entity/SuccessResponseEntity";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { inject, injectable } from "tsyringe";

@injectable()
export class UserController implements IUserController {
  constructor(
    @inject("IUserService")
    private userService: IUserService,
    @inject("IChatService")
    private chatService: IChatService
  ) {}
  getChats = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const chats = await this.chatService.getManyByUserId(id);
      const chatsDto = ChatMapper.ManyDomainToDto(chats);
      const response = new SuccessResponseEntity(
        chatsDto,
        StatusCodes.OK,
        "Chats retrieved successfully"
      );
      ResponseService.send(res, response);
    } catch (error) {
      console.log(error);
      throw new ApiError();
    }
  };

  freelance = async (req: Request, res: Response) => {
    const userId = req.user?.id ?? req.params.id;
    if (!userId) {
      throw new ApiError(StatusCodes.UNAUTHORIZED, "User not authenticated");
    }
    // const userId = req.params.id;
    const user = await this.userService.createFreelanceProfile(userId);
    res.status(200).json(user);
  };

  get = async (req: Request, res: Response) => {
    try {
      const id: string = req.params.id;
      const user = await this.userService.get(id);
      if (user !== null) {
        const userDto = UserMapper.domainToGetUserDto(user);
        res.status(200).json(userDto);
      } else res.status(404).json({ error: "user not found" });
    } catch (error) {
      res.status(500).json(error);
      console.log(error);
    }
  };
  post = async (req: Request, res: Response) => {
    try {
      const dto: ICreateUserDto = req.body as ICreateUserDto;
      const user: User = UserMapper.createUserDtoTodomain(dto);
      const data = await this.userService.create(user);
      const response = new SuccessResponseEntity(
        data,
        StatusCodes.CREATED,
        "User created successfully"
      );
      ResponseService.send(res, response);
    } catch (error) {
      res.status(500).json(error);
      console.log(error);
    }
  };
  updateUser = async (req: Request, res: Response): Promise<void> => {
    const userId = req.user?.id;
    const userData: ICreateUserDto = req.body;
    if (!userId) {
      throw new ApiError(StatusCodes.UNAUTHORIZED, "User not authenticated");
    }
    try {
      userData.userEmail = "a@example.com";
      const user = UserMapper.createUserDtoTodomain(userData);
      const updatedUser = await this.userService.update(userId, user);
      const response = new SuccessResponseEntity(
        UserMapper.domainToGetUserDto(updatedUser),
        StatusCodes.OK,
        "User updated successfully"
      );
      ResponseService.send(res, response);
    } catch (error) {
      console.error(error);
      throw new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "Failed to update user"
      );
    }
  };
}
