import { UserRole } from "../../aggregates/User";

export class GetUserDto {
  constructor(
    public userName: string,
    public serEmail: string,
    public roles: UserRole[],
    public reatedAt: Date
  ) {}
}
