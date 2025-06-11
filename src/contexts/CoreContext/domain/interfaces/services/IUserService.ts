import { IService } from "@/contexts/Shared/Domain/service/IService";
import { User } from "../../aggregates/User";
export interface IUserService extends IService<User> {
  delete(id: string): Promise<string | void>;
  addRole(role: string): Promise<void>;
  createFreelanceProfile(id: string): Promise<User>;
}
