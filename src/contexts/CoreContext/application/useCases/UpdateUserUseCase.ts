import { inject, injectable } from "tsyringe";
import { User } from "../../domain/aggregates/User";
import { IUserRepository } from "../../domain/interfaces/repositories/IUserRepository";
import IUseCase from "@/contexts/LearningContext/domain/interfaces/IUseCase";

@injectable()
export class UpdateUserUseCase
  implements IUseCase<{ userId: string; userData: User }, User>
{
  constructor(
    @inject("IUserRepository")
    private userRepository: IUserRepository
  ) {}

  async execute({
    userId,
    userData,
  }: {
    userId: string;
    userData: User;
  }): Promise<User> {
    const user = await this.userRepository.getById(userId);
    if (!user) throw new Error("User not found");

    Object.assign(user, userData);
    const updatedUser = await this.userRepository.update(userId, user);
    if (!updatedUser) throw new Error("Failed to update user");
    return updatedUser;
  }
}
