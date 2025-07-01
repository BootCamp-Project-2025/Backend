import { inject, injectable } from "tsyringe";
import { User } from "../../domain/aggregates/User";
import { IGetUserProfileDto } from "../../domain/interfaces/dtos/IGetUserProfileDto";
import { IUserService } from "../../domain/interfaces/services/IUserService";
import { CreateUserFreelancerProfileUseCase } from "../useCases/CreateUserFreelancerProfileUseCase";
import { CreateUserUseCase } from "../useCases/CreateUserUseCase";
import { GetUserProfileUseCase } from "../useCases/GetUserProfileUseCase";
import { GetUserUseCase } from "../useCases/GetUserUseCase";
import { UpdateUserUseCase } from "../useCases/UpdateUserUseCase";

@injectable()
export class UserService implements IUserService {
  constructor(
    @inject("CreateUserUseCase")
    private readonly createUserUseCase: CreateUserUseCase,
    @inject("GetUserUseCase")
    private readonly getUserUseCase: GetUserUseCase,
    @inject("CreateUserFreelancerProfileUseCase")
    private readonly createUserFreelancerProfileUseCase: CreateUserFreelancerProfileUseCase,
    @inject("GetUserProfileUseCase")
    private readonly getUserProfileUseCase: GetUserProfileUseCase,
    @inject("UpdateUserUseCase")
    private readonly updateUserUseCase: UpdateUserUseCase
  ) {}
  async createFreelanceProfile(id: string): Promise<User> {
    const updatedUser =
      await this.createUserFreelancerProfileUseCase.execute(id);

    return updatedUser;
  }
  delete(): Promise<string | void> {
    throw new Error("Method not implemented.");
  }
  addRole(): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async get(id: string): Promise<User | null> {
    return await this.getUserUseCase.execute(id);
  }
  getAll(): Promise<User[]> {
    throw new Error("Method not implemented.");
  }
  update(id: string, userData: User): Promise<User> {
    return this.updateUserUseCase.execute({ userId: id, userData });
  }
  async create(user: User): Promise<User> {
    return await this.createUserUseCase.execute(user);
  }
  async getClientProfile(userId: string): Promise<IGetUserProfileDto> {
    return await this.getUserProfileUseCase.execute(userId);
  }
}
