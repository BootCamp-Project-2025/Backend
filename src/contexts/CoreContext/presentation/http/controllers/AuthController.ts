import { User } from "@/contexts/CoreContext/domain/aggregates/User";
import { IAuthController } from "@/contexts/CoreContext/domain/interfaces/controllers/IAuthController";
import { ICreateUserDto } from "@/contexts/CoreContext/domain/interfaces/dtos/ICreateUserDto";
import UserMapper from "@/contexts/CoreContext/mappers/UserMapper";
import { ResponseService } from "@/contexts/Shared/application/services/ResponseService";
import { ErrorResponseEntity } from "@/contexts/Shared/domain/entity/ErrorResponseEntity";
import { SuccessResponseEntity } from "@/contexts/Shared/domain/entity/SuccessResponseEntity";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import { IAuthService } from "@/contexts/CoreContext/domain/interfaces/services/IAuthService";
import { inject, injectable } from "tsyringe";

@injectable()
export class AuthController implements IAuthController {
  constructor(
    @inject("IAuthService")
    private authService: IAuthService
  ) {}

  updateUserRoles = async (req: Request, res: Response): Promise<void> => {
    try {
      console.log("Updating user roles controller start", Date.now());
      const tokenData = req.user;
      if (!tokenData) {
        throw new ApiError(StatusCodes.UNAUTHORIZED, "Unauthorized");
      }

      const { role } = req.body;
      if (!role) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "Role is required");
      }

      const user: User = UserMapper.createUserDtoTodomain({
        id: tokenData.id ?? "Unknown ID",
        userName: tokenData.name ?? "Unknown User",
        userEmail: tokenData.email ?? "Unknown Email",
        profilePicture: "",
      });

      await this.authService.updateUserRoles(user, role);
      const response = new SuccessResponseEntity(
        null,
        StatusCodes.OK,
        "User roles updated successfully"
      );
      ResponseService.send(res, response);
      console.log("Updating user roles controller end", Date.now());
    } catch (error) {
      console.error("Error updating user roles:", error);
      ResponseService.send(
        res,
        new ErrorResponseEntity(
          StatusCodes.INTERNAL_SERVER_ERROR,
          "Internal server error"
        )
      );
    }
  };

  syncUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const tokenData = req.user;
      if (!tokenData) {
        throw new ApiError(StatusCodes.UNAUTHORIZED, "Unauthorized");
      }
      const dto: ICreateUserDto = {
        id: tokenData.id ?? "Unknown ID",
        userName: tokenData.name ?? "Unknown User",
        userEmail: tokenData.email ?? "Unknown Email",
        profilePicture: "",
      };

      console.log("Syncing user controller start", dto);

      const user: User = UserMapper.createUserDtoTodomain(dto);

      const data = await this.authService.syncUser(user);
      const response = new SuccessResponseEntity(
        UserMapper.domainToGetUserDto(data),
        StatusCodes.OK,
        "User synced successfully"
      );
      ResponseService.send(res, response);
    } catch (error) {
      console.error("Error syncing user:", error);
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
