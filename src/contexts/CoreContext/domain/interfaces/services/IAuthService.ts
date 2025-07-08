import { User } from "../../aggregates/User";

export interface IAuthService {
  syncUser(user: User): Promise<User>;
}
