import { User } from "@/contexts/CoreContext/domain/aggregates/User";
import { IUserController } from "@/contexts/CoreContext/domain/interfaces/controllers/IUserController";
import { ICreateUserDto } from "@/contexts/CoreContext/domain/interfaces/dtos/ICreateUserDto";
import { IUserService } from "@/contexts/CoreContext/domain/interfaces/services/IUserService";
import UserMapper from "@/contexts/CoreContext/mappers/UserMapper";
import { Request, Response } from "express";

export class UserController implements IUserController {
  constructor(private userService: IUserService) {}

  getUser = async (req: Request, res: Response) => {
    try {
      const id: string = req.params;
      const data = this.userService.get(id);
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json(error);
      console.log(error);
    }
  };
  post = async (req: Request, res: Response) => {
    try {
      const dto: ICreateUserDto = req.body as ICreateUserDto;
      const user: User = UserMapper.createUserDtoToDomain(dto);
      const data = await this.userService.create(user);
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json(error);
      console.log(error);
    }
  };
}
