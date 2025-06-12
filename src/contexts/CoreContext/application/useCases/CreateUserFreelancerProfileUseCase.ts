import { User } from "../../domain/aggregates/User";
import { IUserRepository } from "../../domain/interfaces/repositories/IUserRepository";

export class CreateUserFreelancerProfileUseCase {
  constructor(private readonly repository: IUserRepository) {}

  async execute(id: string): Promise<User> {
    return await this.repository.addFreelancerProfile(id);
  }
}
