import { User } from "../../aggregates/User";

export interface IAuthService {
  syncUser(user: User): Promise<User>;
  updateUserRoles(user: User, role: string): Promise<void>;
}
