import { User } from "../domain/aggregates/User";
import { User as PrismaUser, UserRole } from "@/generated/prisma";
import { ICreateUserDto } from "../domain/interfaces/dtos/ICreateUserDto";
import { UserEmail } from "../domain/valueObjects/UserEmail";
import { UserName } from "../domain/valueObjects/UserName";
import { GetUserDto } from "../domain/interfaces/dtos/GetUserDto";

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
      createdAt: user.createdAt,
    };
  }

  static persistanceToDomain(prismaUser: PrismaUser): User {
    return User.create({
      userName: UserName.create(prismaUser.userName),
      userEmail: UserEmail.create(prismaUser.userEmail),
      roles: prismaUser.roles,
      createdAt: prismaUser.createdAt,
    });
  }

  static domainToGetUserDto(user: User): GetUserDto {
    return new GetUserDto(
      user.userName.value,
      user.email.value,
      user.roles,
      user.createdAt
    );
  }
}
