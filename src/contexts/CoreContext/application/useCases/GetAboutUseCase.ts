import { IUserRepository } from "../../domain/interfaces/repositories/IUserRepository";

export class GetAboutUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(userId: string): Promise<string> {
    const user = await this.userRepository.getById(userId);
    if (!user || !user.freelancerProfile) {
      throw new Error("Freelancer profile not found");
    }

    return user.freelancerProfile.about.value;
  }
}
