import prismaClient from "@/contexts/SystemHealth/infrastructure/database/prismaClient";
import { User } from "../../domain/aggregates/User";
import { IUserRepository } from "../../domain/interfaces/repositories/IUserRepository";
import UserMapper from "../../mappers/UserMapper";

export class UserRepository implements IUserRepository {
  getAll(): Promise<User[]> {
    throw new Error("Method not implemented.");
  }
  async getById(id: string): Promise<User | null> {
    try {
      const dbUser = await prismaClient.user.findUnique({
        where: { id: id },
      });
      if (dbUser !== null) {
        const user = UserMapper.persistanceToDomain(dbUser);
        return user;
      }
      return null;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  delete(): Promise<string | void> {
    throw new Error("Method not implemented.");
  }

  async create(user: User): Promise<User> {
    const dbUser = UserMapper.domainToPersistance(user);

    await prismaClient.user.create({
      data: dbUser,
    });
    return user;
  }

  update(): Promise<User> {
    throw new Error("Method not implemented.");
  }
}
