import { inject, injectable } from "tsyringe";
import { IFreelancerService } from "../../domain/interfaces/services/IFreelancerService";
import { About } from "../../domain/valueObjects/About";
import GetAboutUseCase from "../useCases/GetAboutUseCase";
import UpdateAboutUseCase from "../useCases/UpdateAboutUseCase";

@injectable()
export default class FreelancerService implements IFreelancerService {
  constructor(
    @inject("GetAboutUseCase")
    private readonly getAboutUseCase: GetAboutUseCase,

    @inject("UpdateAboutUseCase")
    private readonly updateAboutUseCase: UpdateAboutUseCase
  ) {}
  addSkill(): void {
    throw new Error("Method not implemented.");
  }
  deleteSkill(): void {
    throw new Error("Method not implemented.");
  }
  editSkill(): void {
    throw new Error("Method not implemented.");
  }
  getSkills(): void {
    throw new Error("Method not implemented.");
  }
  async getAbout(freelancerId: string): Promise<About> {
    return this.getAboutUseCase.execute(freelancerId);
  }

  async updateAbout(freelancerId: string, about: About): Promise<About> {
    await this.updateAboutUseCase.execute({ freelancerId, about });
    return about;
  }
}
