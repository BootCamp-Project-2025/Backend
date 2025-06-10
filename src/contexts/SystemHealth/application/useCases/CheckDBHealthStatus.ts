import { DBHealth } from "../../domain/implementations/DBHealth";
import prismaClient from "@/contexts/Shared/infrastructure/database/PrismaClient";

export class CheckDBHealthUseCase {
  private prisma = prismaClient;
  constructor() { }

  async execute(): Promise<DBHealth> {
    try {
      const dbResponse = await this.prisma.$queryRaw`SELECT 1`;
      if (dbResponse) return new DBHealth(true);
    } catch (error) {
      console.log(error);
    }
    return new DBHealth(false);
  }
}
