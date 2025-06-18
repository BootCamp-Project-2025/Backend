import { IService } from "@/contexts/Shared/domain/service/IService";
import { Freelancer } from "../../aggregates/Freelancer";

export interface IFreelancerService extends IService<Freelancer> {
  addSkill(): void;
}
