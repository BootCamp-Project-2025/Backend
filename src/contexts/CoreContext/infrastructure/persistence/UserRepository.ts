import prismaClient from "@/contexts/Shared/infrastructure/database/PrismaClient";
import { User } from "../../domain/aggregates/User";
import { IUserRepository } from "../../domain/interfaces/repositories/IUserRepository";
import UserMapper from "../../mappers/UserMapper";
import { UserDao } from "../../domain/interfaces/dao/UserDao";

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
      return UserMapper.persistanceToDomain(userDb);
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
        const user = UserMapper.persistanceToDomain(dbUser);
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

      await prismaClient.user.create({
        data: dbUser,
      });
      return user;
    } catch (error) {
      console.log(error);
      throw new Error("no se pudo crear");
    }
  }

  update(): Promise<User> {
    throw new Error("Method not implemented.");
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
    return UserMapper.persistanceToDomain(user);
  }
}
