import { User } from "@/contexts/CoreContext/domain/aggregates/User";
import { IUserController } from "@/contexts/CoreContext/domain/interfaces/controllers/IUserController";
import { ICreateUserDto } from "@/contexts/CoreContext/domain/interfaces/dtos/ICreateUserDto";
import { IUserService } from "@/contexts/CoreContext/domain/interfaces/services/IUserService";
import UserMapper from "@/contexts/CoreContext/mappers/UserMapper";
import { Request, Response } from "express";
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
}
