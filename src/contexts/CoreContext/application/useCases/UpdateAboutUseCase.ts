import { IUserRepository } from "../../domain/interfaces/repositories/IUserRepository";
import { About } from "../../domain/valueObjects/About";

export class UpdateFreelancerAboutUseCase {
  constructor(private readonly repository: IUserRepository) {}

  async execute(userId: string, about: string) {
    const user = await this.repository.getById(userId);
    if (!user) throw new Error("User not found");

    const freelancer = user.freelancerProfile;
    if (!freelancer) throw new Error("User is not a freelancer");

    user.freelancerProfile.updateAbout(About.create(about));

    return await this.repository.update(userId, user);
  }
}
