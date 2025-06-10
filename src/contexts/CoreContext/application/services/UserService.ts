import { User } from "../../domain/aggregates/User";
import { IUserService } from "../../domain/interfaces/services/IUserService";
import { CreateUserUseCase } from "../useCases/CreateUserUseCase";
import { GetUserUseCase } from "../useCases/GetUserUseCase";

export class UserService implements IUserService {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly getUserUseCase: GetUserUseCase
  ) {}
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
}
