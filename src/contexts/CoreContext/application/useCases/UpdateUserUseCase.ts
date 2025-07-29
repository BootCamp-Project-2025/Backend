import { inject, injectable } from "tsyringe";
import { User, UserProps } from "../../domain/aggregates/User";
import { IUserRepository } from "../../domain/interfaces/repositories/IUserRepository";
import IUseCase from "@/contexts/LearningContext/domain/interfaces/IUseCase";

@injectable()
export class UpdateUserUseCase
  implements IUseCase<{ userId: string; userData: Partial<UserProps> }, User>
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
    userData: Partial<UserProps>;
  }): Promise<User> {
    const existingUser = await this.userRepository.getById(userId);
    if (!existingUser) {
      throw new Error("User not found");
    }

    const updatedUser = await this.userRepository.updateUserProfile(
      userId,
      userData
    );

    if (!updatedUser) throw new Error("Failed to update user");
    return updatedUser;
  }
}
