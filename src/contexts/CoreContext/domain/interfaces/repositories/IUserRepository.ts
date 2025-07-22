import { IRepository } from "@/contexts/Shared/domain/repository/IRepository";
import { User, UserProps } from "../../aggregates/User";

export interface IUserRepository extends IRepository<User> {
  addFreelancerProfile(id: string): Promise<User>;
  getUserProfileById(id: string): Promise<User | null>;
  updateUserProfile(id: string, user: Partial<UserProps>): Promise<User | null>;
}
