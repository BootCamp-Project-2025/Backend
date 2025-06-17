import { PrismaClient } from "@/generated/prisma";

class CustomPrismaClient {
  private static instance: PrismaClient;
  private constructor() {}

  static getInstance() {
    if (!this.instance) this.instance = new PrismaClient();
    return this.instance;
  }
}

export default CustomPrismaClient.getInstance();
