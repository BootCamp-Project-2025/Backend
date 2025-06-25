import { injectable } from "tsyringe";
import { User } from "../../domain/aggregates/User";
import { IUserRepository } from "../../domain/interfaces/repositories/IUserRepository";

@injectable()
export class CreateUserUseCase {
  constructor(private readonly repository: IUserRepository) {}

  async execute(user: User) {
    return await this.repository.create(user);
  }
}
