import { IRepository } from "@/contexts/Shared/domain/repository/IRepository";
import { Education } from "../../entities/Education";
import { Freelancer } from "../../aggregates/Freelancer";

export default interface IEducationRepository extends IRepository<Education> {
  save(freelancer: Freelancer): Promise<Education>;
  getByFreelancerId(freelancerId: string): Promise<Education[]>;
  add(education: Education): Education | Promise<Education>;
}
