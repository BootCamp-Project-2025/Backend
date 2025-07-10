import IUseCase from "@/contexts/LearningContext/domain/interfaces/IUseCase";
import { Freelancer } from "../../domain/aggregates/Freelancer";
import { IFreelancerRepository } from "../../domain/interfaces/repositories/IFreelancerRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export class GetAllFreelancersUseCase implements IUseCase<null, Freelancer[]> {
  constructor(
    @inject("IFreelancerRepository")
    private freelancerRepository: IFreelancerRepository
  ) {}
  async execute(): Promise<Freelancer[]> {
    return await this.freelancerRepository.getAll();
  }
}
