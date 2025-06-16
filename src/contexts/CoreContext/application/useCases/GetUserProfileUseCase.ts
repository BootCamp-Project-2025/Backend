import { IGetUserProfileDto } from "../../domain/interfaces/dtos/IGetUserProfileDto";
import { IUserRepository } from "../../domain/interfaces/repositories/IUserRepository";
import UserMapper from "../../mappers/UserMapper";

export class GetUserProfileUseCase {
  constructor(private readonly repository: IUserRepository) {}

  async execute(userId: string): Promise<IGetUserProfileDto> {
    const user = await this.repository.getUserProfileById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    const userDto = UserMapper.domainToGetUserDto(user);
    return {
      userName: userDto.userName,
      userEmail: userDto.userEmail,
      clienProfile: userDto.clientProfile,
    };
  }
}
