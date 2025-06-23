import { inject, injectable } from "tsyringe";
import { User } from "../../domain/aggregates/User";
import { IUserRepository } from "../../domain/interfaces/repositories/IUserRepository";

@injectable()
export class GetUserUseCase {
  constructor(
    @inject("IUserRepository")
    private readonly repository: IUserRepository
  ) {}

  async execute(id: string): Promise<User | null> {
    return await this.repository.getById(id);
  }
}
