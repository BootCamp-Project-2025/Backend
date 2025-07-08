import { Freelancer } from "../../aggregates/Freelancer";

export interface IFreelancerService {
  getAll(): Promise<Freelancer[]>;
}
