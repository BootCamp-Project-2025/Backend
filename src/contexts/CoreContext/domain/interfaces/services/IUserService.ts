import { IService } from "@/contexts/Shared/domain/service/IService";
import { User } from "../../aggregates/User";
import { Enrollment } from "../../aggregates/Enrollment";
export interface IUserService extends IService<User> {
  delete(id: string): Promise<string | void>;
  addRole(role: string): Promise<void>;
  createFreelanceProfile(id: string): Promise<User>;
  getEnrollments(userId: string): Promise<Enrollment[]>;
}
