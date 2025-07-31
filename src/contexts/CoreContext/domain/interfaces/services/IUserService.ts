import { IService } from "@/contexts/Shared/domain/service/IService";
import { User, UserProps } from "../../aggregates/User";
import { Course } from "@/contexts/LearningContext/domain/aggregates/Course";
export interface IUserService extends IService<User> {
  delete(id: string): Promise<string | void>;
  addRole(role: string): Promise<void>;
  createFreelanceProfile(id: string): Promise<User>;
  updateUserProfile(id: string, user: Partial<UserProps>): Promise<User | null>;
  getCourses(userId: string): Promise<Course[]>;
}
