import { IService } from "@/contexts/Shared/Domain/service/IService";
import { Freelancer } from "../../entities/Freelancer";

export interface IFreelancerService extends IService<Freelancer> {
  addSkill(): void;
}
