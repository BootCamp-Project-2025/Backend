import { inject, injectable } from "tsyringe";
import { User } from "../../domain/aggregates/User";
import { IUserRepository } from "../../domain/interfaces/repositories/IUserRepository";

@injectable()
export class CreateUserFreelancerProfileUseCase {
  constructor(
    @inject("IUserRepository")
    private readonly repository: IUserRepository
  ) {}

  async execute(id: string): Promise<User> {
    return await this.repository.addFreelancerProfile(id);
  }
}
