import { injectable, inject } from "tsyringe";
import { IGetUserProfileDto } from "../../domain/interfaces/dtos/IGetUserProfileDto";
import { IUserRepository } from "../../domain/interfaces/repositories/IUserRepository";
import UserMapper from "../../mappers/UserMapper";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";

@injectable()
export class GetUserProfileUseCase {
  constructor(
    @inject("IUserRepository")
    private readonly repository: IUserRepository
  ) {}

  async execute(userId: string): Promise<IGetUserProfileDto> {
    const user = await this.repository.getUserProfileById(userId);
    if (!user) {
      throw new ApiError(404, "User not found", [
        `User with ID ${userId} does not exist`,
      ]);
    }

    return UserMapper.domainToClientProfileDto(user);
  }
}
