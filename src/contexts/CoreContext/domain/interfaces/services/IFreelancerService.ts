import { Freelancer } from "../../aggregates/Freelancer";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface IFreelancerService {
  getAll(): Promise<Freelancer[]>;
}
