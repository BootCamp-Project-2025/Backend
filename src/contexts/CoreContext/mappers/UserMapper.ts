import { User } from "../domain/aggregates/User";
import { User as PrismaUser, UserRole } from "@/generated/prisma";
import { ICreateUserDto } from "../domain/interfaces/dtos/ICreateUserDto";
import { UserEmail } from "../domain/valueObjects/UserEmail";
import { UserName } from "../domain/valueObjects/UserName";

export default class UserMapper {
  static createUserDtoToDomain(dto: ICreateUserDto) {
    return User.create({
      userName: UserName.create(dto.userName),
      userEmail: UserEmail.create(dto.userEmail),
      roles: ["CLIENT"],
      createdAt: new Date(),
    });
  }

  static domainToPersistance(user: User): PrismaUser {
    const roles2: UserRole[] = user.roles.map((role) => role);
    return {
      id: user.id.toString(),
      userName: user.userName.value,
      userEmail: user.email.value,
      roles: roles2,
      createdAt: new Date(),
    };
  }
}
