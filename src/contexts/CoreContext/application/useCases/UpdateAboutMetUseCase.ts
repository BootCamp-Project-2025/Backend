import { About } from "../../domain/valueObjects/About";

export interface AboutMeDTO {
  about: string;
  freelancerId: string;
}
export class UpdateAboutMeUseCase {
  constructor(private freelancerRepo: type?) {} //Add type for freelancerRepo

  async execute(dto: AboutMeDTO): Promise<void> {
    const freelancer = await this.freelancerRepo.getById(dto.freelancerId);
    if (!freelancer) {
      throw new Error("Freelancer not found");
    }

    const about = About.create(dto.about);
    freelancer.updateAbout(about);
    await this.freelancerRepo.save(freelancer); //logic to update and save
  }
}
