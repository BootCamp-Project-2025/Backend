import { inject, injectable } from "tsyringe";
import { IFreelancerService } from "../../domain/interfaces/services/IFreelancerService";
import { Freelancer } from "../../domain/aggregates/Freelancer";
import IUseCase from "@/contexts/LearningContext/domain/interfaces/IUseCase";

@injectable()
export default class FreelancerService implements IFreelancerService {
  constructor(
    @inject("IGetAllFreelancerUseCase")
    private getAllFreelancersUseCase: IUseCase<null, Freelancer[]>
  ) {}
  async getAll(): Promise<Freelancer[]> {
    return await this.getAllFreelancersUseCase.execute();
  }
}
