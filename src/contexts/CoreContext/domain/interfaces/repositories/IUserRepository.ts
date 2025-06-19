import { IRepository } from "@/contexts/Shared/Domain/repository/IRepository";
import { User } from "../../aggregates/User";

export interface IUserRepository extends IRepository<User> {
  addFreelancerProfile(id: string): Promise<User>;
  getUserProfileById(id: string): Promise<User | null>;
}
