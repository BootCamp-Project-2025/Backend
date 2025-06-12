import { IRepository } from "@/contexts/Shared/Domain/repository/IRepository";
import { Freelancer } from "../../entities/Freelancer";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface IFreelancerRepository extends IRepository<Freelancer> {
  addAbout(freelancerId: string, about: string): Promise<void>;
}
