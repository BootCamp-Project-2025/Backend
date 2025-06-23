import { injectable, inject } from "tsyringe";
import { IGetUserProfileDto } from "../../domain/interfaces/dtos/IGetUserProfileDto";
import { IUserRepository } from "../../domain/interfaces/repositories/IUserRepository";
import UserMapper from "../../mappers/UserMapper";

@injectable()
export class GetUserProfileUseCase {
  constructor(
    @inject("IUserRepository")
    private readonly repository: IUserRepository
  ) {}

  async execute(userId: string): Promise<IGetUserProfileDto> {
    const user = await this.repository.getUserProfileById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    return UserMapper.domainToClientProfileDto(user);
  }
}
