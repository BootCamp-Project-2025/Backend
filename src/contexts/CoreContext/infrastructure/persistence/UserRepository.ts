import prismaClient from "@/contexts/Shared/infrastructure/database/PrismaClient";
import { User } from "../../domain/aggregates/User";
import { IUserRepository } from "../../domain/interfaces/repositories/IUserRepository";
import UserMapper from "../../mappers/UserMapper";
import { UserDao } from "../../domain/interfaces/dao/UserDao";
import { injectable } from "tsyringe";

@injectable()
export class UserRepository implements IUserRepository {
  async addFreelancerProfile(id: string): Promise<User> {
    try {
      const userDb: UserDao = await prismaClient.user.update({
        where: { id: id.toString() },
        data: {
          roles: ["CLIENT", "FREELANCER"],
          freelancerProfile: {
            create: {},
          },
        },
        include: { freelancerProfile: true, clientProfile: true },
      });
      return UserMapper.persistanceTodomain(userDb);
    } catch (e) {
      console.log(e);
      throw new Error("profile couldnt be created");
    }
  }
  getAll(): Promise<User[]> {
    throw new Error("Method not implemented.");
  }

  async getById(id: string): Promise<User | null> {
    try {
      const dbUser = await prismaClient.user.findUnique({
        where: { id: id },
        include: { freelancerProfile: true, clientProfile: true },
      });
      if (dbUser !== null) {
        const user = UserMapper.persistanceTodomain(dbUser);
        return user;
      }
      return null;
    } catch (error) {
      console.log(error);
      throw new Error("User not found");
    }
  }

  delete(): Promise<string | void> {
    throw new Error("Method not implemented.");
  }

  async create(user: User): Promise<User> {
    try {
      const dbUser = UserMapper.domainToPersistance(user);
      console.log("dbUser", dbUser);
      await prismaClient.user.create({
        data: {
          ...dbUser,
          clientProfile: {
            create: {
              socialLink: {
                create: [
                  {
                    platform: "LINKEDIN",
                    url: "",
                  },
                  {
                    platform: "FACEBOOK",
                    url: "",
                  },
                  {
                    platform: "INSTAGRAM",
                    url: "",
                  },
                  {
                    platform: "YOUTUBE",
                    url: "",
                  },
                ],
              },
            },
          },
        },
      });
      return user;
    } catch (error) {
      console.log(error);
      throw new Error("no se pudo crear");
    }
  }

  async update(userId: string, userData: User): Promise<User> {
    const user = await prismaClient.user.update({
      where: { id: userId },
      data: {
        userName: userData.userName.value,
        profilePicture: userData.profilePicture,
      },
      include: {
        freelancerProfile: true,
        clientProfile: true,
      },
    });
    return UserMapper.persistanceTodomain(user);
  }

  async getUserProfileById(id: string): Promise<User | null> {
    const user = await prismaClient.user.findUnique({
      where: { id: id },
      include: {
        freelancerProfile: true,
        clientProfile: true,
      },
    });
    if (!user) return null;
    return UserMapper.persistanceTodomain(user);
  }
}
