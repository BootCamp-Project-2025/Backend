import { IRepository } from "@/contexts/Shared/domain/repository/IRepository";
import { User } from "../../aggregates/User";

export interface IUserRepository extends IRepository<User> {
  addFreelancerProfile(id: string): Promise<User>;
}
