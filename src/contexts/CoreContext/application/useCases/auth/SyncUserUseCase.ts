import { inject, injectable } from "tsyringe";

import IUseCase from "@/contexts/LearningContext/domain/interfaces/IUseCase";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { StatusCodes } from "http-status-codes";
import { IUserRepository } from "@/contexts/CoreContext/domain/interfaces/repositories/IUserRepository";
import { User } from "@/contexts/CoreContext/domain/aggregates/User";

@injectable()
export class SyncUserUseCase implements IUseCase<User, User | null> {
  constructor(
    @inject("IUserRepository")
    private readonly repository: IUserRepository
  ) {}

  async execute(user: User) {
    try {
      const existingUser = await this.repository.getById(user.id.toValue());
      if (existingUser) {
        return existingUser;
      }
      const newUser = await this.repository.create(user);
      return newUser;
    } catch (error) {
      console.error("Error creating user:", error);
      throw new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "Failed to create user"
      );
    }
  }
}
