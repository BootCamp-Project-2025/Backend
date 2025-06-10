import prismaClient from "@/contexts/SystemHealth/infrastructure/database/prismaClient";
import { User } from "../../domain/aggregates/User";
import { IUserRepository } from "../../domain/interfaces/repositories/IUserRepository";
import { UserEmail } from "../../domain/valueObjects/UserEmail";
import { UserName } from "../../domain/valueObjects/UserName";
import UserMapper from "../../mappers/UserMapper";

export class UserRepository implements IUserRepository {
  getAll(): Promise<User[]> {
    throw new Error("Method not implemented.");
  }
  getById(id: string): Promise<User> {
    throw new Error("Method not implemented.");
  }
  delete(id: string): Promise<string | void> {
    throw new Error("Method not implemented.");
  }

  async create(user: User): Promise<User> {
    const dbUser = UserMapper.domainToPersistance(user);

    await prismaClient.user.create({
      data: dbUser,
    });
    return user;
  }

  update(id: string, object: User): Promise<User> {
    throw new Error("Method not implemented.");
  }
}
