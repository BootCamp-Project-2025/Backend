import { IRepository } from "@/contexts/Shared/Domain/repository/IRepository";
import { User } from "../../aggregates/User";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface IUserRepository extends IRepository<User> {}
