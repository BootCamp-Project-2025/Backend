import { User } from "../../domain/aggregates/User";
import { ICreateUserDto } from "../../domain/interfaces/dtos/ICreateUserDto";
import { IUserService } from "../../domain/interfaces/services/IUserService";
import { UserEmail } from "../../domain/valueObjects/UserEmail";
import { UserName } from "../../domain/valueObjects/UserName";
import { CreateUserUseCase } from "../useCases/CreateUserUseCase";
import { GetUserUseCase } from "../useCases/GetUserUseCase";

export class UserService implements IUserService {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly getUserUseCase: GetUserUseCase
  ) {}
  delete(id: string): string | void {
    throw new Error("Method not implemented.");
  }
  addRole(role: string): void {
    throw new Error("Method not implemented.");
  }
  get(id: string): User | undefined {
    throw new Error("Method not implemented.");
  }
  getAll(): User[] {
    throw new Error("Method not implemented.");
  }
  update(id: string, object: User): User {
    throw new Error("Method not implemented.");
  }
  async create(user: User): User {
    return await this.createUserUseCase.execute(user);
  }
}
