import { User } from "../domain/aggregates/User";
import { User as PrismaUser, UserRole } from "@/generated/prisma";
import { ICreateUserDto } from "../domain/interfaces/dtos/ICreateUserDto";
import { UserEmail } from "../domain/valueObjects/UserEmail";
import { UserName } from "../domain/valueObjects/UserName";
import { IGetUserDto } from "../domain/interfaces/dtos/IGetUserDto";
import { UserDao } from "../domain/interfaces/dao/UserDao";
import { UniqueEntityID } from "@/contexts/Shared/domain/UniqueEntityID";

export default class UserMapper {
  static createUserDtoTodomain(dto: ICreateUserDto) {
    return User.create({
      userName: UserName.create(dto.userName),
      userEmail: UserEmail.create(dto.userEmail),
      roles: ["CLIENT"],
      createdAt: new Date(),
      profilePicture: dto.profilePicture,
    });
  }

  static domainToPersistance(user: User): PrismaUser {
    const roles2: UserRole[] = user.roles.map((role) => role);
    return {
      id: user.id.toString(),
      userName: user.userName.value,
      userEmail: user.userEmail.value,
      profilePicture: user.profilePicture ?? null,
      roles: roles2,
      createdAt: user.createdAt,
    };
  }

  static persistanceTodomain(userDao: UserDao): User {
    try {
      return User.create({
        userName: UserName.create(userDao.userName),
        userEmail: UserEmail.create(userDao.userEmail),
        roles: userDao.roles,
        createdAt: userDao.createdAt,
        profilePicture: userDao.profilePicture ?? undefined,
        freelancerId: userDao.freelancerProfile
          ? new UniqueEntityID(userDao.freelancerProfile.id)
          : undefined,
        clientId: userDao.freelancerProfile
          ? new UniqueEntityID(userDao.freelancerProfile.id)
          : undefined,
      });
    } catch (e) {
      console.log(e);
      throw new Error("cant mapp persistance to domain");
    }
  }

  static domainToGetUserDto(user: User): IGetUserDto {
    return {
      userName: user.userName.value,
      userEmail: user.userEmail.value,
      createdAt: user.createdAt,
      roles: user.roles,
      id: user.id.toString(),
      freelancerProfile: user.props.freelancerId?.toString(),
      clientProfile: user.props.clientId?.toString(),
      profilePicture: user.profilePicture,
    };
  }
}
