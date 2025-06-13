import { User } from "../../domain/aggregates/User";
import { IFreelancerService } from "../../domain/interfaces/services/IFreelancerService";
import { GetAboutUseCase } from "../useCases/GetAboutUseCase";
import { UpdateAboutUseCase } from "../useCases/UpdateAboutUseCase";

export default class FreelancerService implements IFreelancerService {
  constructor(
    private readonly updateAboutUseCase: UpdateAboutUseCase,
    private readonly getAboutUseCase: GetAboutUseCase
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
  async getAbout(userId: string): Promise<string> {
    const user = await this.getAboutUseCase.execute(userId);
    return user;
  }
  async updateAbout(userId: string, about: string): Promise<User> {
    return await this.updateAboutUseCase.execute(userId, about);
  }
}
