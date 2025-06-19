import { User } from "../domain/aggregates/User";
import { User as PrismaUser, UserRole } from "@/generated/prisma";
import { ICreateUserDto } from "../domain/interfaces/dtos/ICreateUserDto";
import { UserEmail } from "../domain/valueObjects/UserEmail";
import { UserName } from "../domain/valueObjects/UserName";
import { IGetUserDto } from "../domain/interfaces/dtos/IGetUserDto";
import { UserDao } from "../domain/interfaces/dao/UserDao";
import FreelancerMapper from "./FreelancerMapper";
import { IGetUserProfileDto } from "../domain/interfaces/dtos/IGetUserProfileDto";
import { ImageProfile } from "../domain/valueObjects/ImageProfile";

export default class UserMapper {
  static createUserDtoToDomain(dto: ICreateUserDto) {
    return User.create({
      userName: UserName.create(dto.userName),
      userEmail: UserEmail.create(dto.userEmail),
      roles: ["CLIENT"],
      createdAt: new Date(),
      imageProfile: dto.imageProfile
        ? ImageProfile.create(dto.imageProfile)
        : undefined,
    });
  }

  static domainToPersistance(user: User): PrismaUser {
    const roles2: UserRole[] = user.roles.map((role) => role);
    return {
      id: user.id.toString(),
      userName: user.userName.value,
      userEmail: user.email.value,
      imageProfile: user.imageProfile?.value ?? null,
      roles: roles2,
      createdAt: user.createdAt,
    };
  }

  static persistanceToDomain(userDao: UserDao): User {
    try {
      let freelancer = undefined;
      if (userDao.freelancerProfile !== null) {
        freelancer = FreelancerMapper.persistanceToDomain(
          userDao.id,
          userDao.freelancerProfile
        );
      }
      return User.create({
        userName: UserName.create(userDao.userName),
        userEmail: UserEmail.create(userDao.userEmail),
        roles: userDao.roles,
        createdAt: userDao.createdAt,
        freelancerProfile: freelancer,
        clientProfile: undefined,
      });
    } catch (e) {
      console.log(e);
      throw new Error("cant mapp persistance to domain");
    }
  }

  static domainToGetUserDto(user: User): IGetUserDto {
    let freelancer = undefined;
    if (user.freelancerProfile !== undefined)
      freelancer = FreelancerMapper.domainToFreelancerProfileDto(
        user.freelancerProfile
      );
    return {
      userName: user.userName.value,
      userEmail: user.email.value,
      createdAt: user.createdAt,
      roles: user.roles,
      id: user.id.toString(),
      freelancerProfile: freelancer,
      clientProfile: undefined,
    };
  }

  static toUserProfileDto(user: User): IGetUserProfileDto {
    return {
      id: user.id.toString(),
      userName: user.userName.value,
      userEmail: user.email.value,
      imageProfile: user.imageProfile?.value || null,
    };
  }
}
