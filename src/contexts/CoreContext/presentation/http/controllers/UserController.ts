import { User } from "@/contexts/CoreContext/domain/aggregates/User";
import { IUserController } from "@/contexts/CoreContext/domain/interfaces/controllers/IUserController";
import { ICreateUserDto } from "@/contexts/CoreContext/domain/interfaces/dtos/ICreateUserDto";
import { IUserService } from "@/contexts/CoreContext/domain/interfaces/services/IUserService";
import UserMapper from "@/contexts/CoreContext/mappers/UserMapper";
import { ResponseService } from "@/contexts/Shared/application/services/ResponseService";
import { ErrorResponseEntity } from "@/contexts/Shared/domain/entity/ErrorResponseEntity";
import { SuccessResponseEntity } from "@/contexts/Shared/domain/entity/SuccessResponseEntity";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { inject, injectable } from "tsyringe";

@injectable()
export class UserController implements IUserController {
  constructor(
    @inject("IUserService")
    private userService: IUserService
  ) {}
  freelance = async (req: Request, res: Response) => {
    const user = await this.userService.createFreelanceProfile(req.params.id);
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
      res.status(201).json(data);
    } catch (error) {
      res.status(500).json(error);
      console.log(error);
    }
  };

  getUserProfile = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = req.params.id;
      const profile = await this.userService.getClientProfile(userId);
      if (!profile) {
        res.status(404).json({ message: "Client Profile not found" });
        return;
      }
      res.status(200).json(profile);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  syncUser = async (req: Request, res: Response) => {
    try {
      const tokenData = req.user;
      if (!tokenData) {
        throw new ApiError(StatusCodes.UNAUTHORIZED, "Unauthorized");
      }

      const dto: ICreateUserDto = {
        id: tokenData.id ?? "Unknown ID",
        userName: tokenData.name ?? "Unknown User",
        userEmail: tokenData.email ?? "Unknown Email",
        profilePictureSrc: "https://example.com/default-profile.png",
      };

      const user: User = UserMapper.createUserDtoTodomain(dto);

      const data = await this.userService.syncUser(user);
      const response = new SuccessResponseEntity(
        UserMapper.domainToGetUserDto(data),
        StatusCodes.CREATED,
        "User created successfully"
      );
      ResponseService.send(res, response);
    } catch {
      ResponseService.send(
        res,
        new ErrorResponseEntity(
          StatusCodes.INTERNAL_SERVER_ERROR,
          "Internal server error"
        )
      );
    }
  };
}
