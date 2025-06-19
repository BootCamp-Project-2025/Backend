import { User } from "../../domain/aggregates/User";
import { IGetUserProfileDto } from "../../domain/interfaces/dtos/IGetUserProfileDto";
import { IUserService } from "../../domain/interfaces/services/IUserService";
import { CreateUserFreelancerProfileUseCase } from "../useCases/CreateUserFreelancerProfileUseCase";
import { CreateUserUseCase } from "../useCases/CreateUserUseCase";
import { GetUserProfileUseCase } from "../useCases/GetUserProfileUseCase";
import { GetUserUseCase } from "../useCases/GetUserUseCase";

export class UserService implements IUserService {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly getUserUseCase: GetUserUseCase,
    private readonly createUserFreelancerProfileUseCase: CreateUserFreelancerProfileUseCase,
    private readonly getUserProfileUseCase: GetUserProfileUseCase
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
  update(): Promise<User> {
    throw new Error("Method not implemented.");
  }
  async create(user: User): Promise<User> {
    return await this.createUserUseCase.execute(user);
  }
  async getProfile(userId: string): Promise<IGetUserProfileDto> {
    return await this.getUserProfileUseCase.execute(userId);
  }
}
