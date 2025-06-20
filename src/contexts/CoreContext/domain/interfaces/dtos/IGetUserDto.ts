import { UserRole } from "../../aggregates/User";

export interface IGetUserDto {
  id: string;
  userName: string;
  userEmail: string;
  roles: UserRole[];
  createdAt: Date;
  freelancerProfile: string | undefined;
  clientProfile: string | undefined;
}
