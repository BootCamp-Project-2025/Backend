import { UserRole } from "../../aggregates/User";
import { IFreelancerProfileDto } from "./IFreelancerProfileDto";

export interface IGetUserDto {
  id: string;
  userName: string;
  userEmail: string;
  roles: UserRole[];
  createdAt: Date;
  freelancerProfile: IFreelancerProfileDto | undefined;
  clientProfile: undefined;
}
