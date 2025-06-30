import { IService } from "@/contexts/Shared/domain/service/IService";
import { User } from "../../aggregates/User";
import { IGetUserProfileDto } from "../dtos/IGetUserProfileDto";
export interface IUserService extends IService<User> {
  delete(id: string): Promise<string | void>;
  addRole(role: string): Promise<void>;
  createFreelanceProfile(id: string): Promise<User>;
  getClientProfile(userId: string): Promise<IGetUserProfileDto>;
}
