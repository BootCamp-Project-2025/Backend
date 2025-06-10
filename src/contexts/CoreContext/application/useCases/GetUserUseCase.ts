import { User } from "../../domain/aggregates/User";
import { IUserRepository } from "../../domain/interfaces/repositories/IUserRepository";

export class GetUserUseCase {
  constructor(private readonly repository: IUserRepository) {}

  execute(id: string): User {
    return this.repository.getById(id);
  }
}
