import { IRepository } from "@/contexts/Shared/domain/repository/IRepository";
import { User, UserProps } from "../../aggregates/User";
import { Course } from "@/contexts/LearningContext/domain/aggregates/Course";

export interface IUserRepository extends IRepository<User> {
  addFreelancerProfile(id: string): Promise<User>;
  getUserProfileById(id: string): Promise<User | null>;
  updateUserProfile(id: string, user: Partial<UserProps>): Promise<User | null>;
  getCourses(userId: string): Promise<Course[]>;
}
