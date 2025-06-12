import { ApiError } from "../../../../contexts/Shared/infrastructure/errors/ApiError";
import { DBHealth } from "../../domain/implementations/DBHealth";
import prismaClient from "../../infrastructure/database/prismaClient";

export class CheckDBHealthUseCase {
  private prisma = prismaClient;
  constructor() {}

  async execute(): Promise<DBHealth> {
    try {
      await this.prisma.$queryRaw`SELECT 1`;
      return new DBHealth(true);
    } catch (error) {
      console.log(error);
      throw new ApiError(505, "Internal server error", ["DB is not connected"]);
    }
  }
}
