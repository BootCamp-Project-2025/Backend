import { User } from "../../domain/aggregates/User";
import { IUserRepository } from "../../domain/interfaces/repositories/IUserRepository";

export class GetUserUseCase {
  constructor(private readonly repository: IUserRepository) {}

  async execute(id: string): Promise<User | null> {
    return await this.repository.getById(id);
  }
}
