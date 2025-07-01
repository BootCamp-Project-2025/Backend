import "reflect-metadata";
import { User } from "@/contexts/CoreContext/domain/aggregates/User";
import { UserRepository } from "@/contexts/CoreContext/infrastructure/persistence/UserRepository";

jest.mock("@/contexts/Shared/infrastructure/database/PrismaClient", () => ({
  __esModule: true,
  default: {
    user: {
      findUnique: jest.fn(),
    },
  },
}));

import PrismaClient from "@/contexts/Shared/infrastructure/database/PrismaClient";

describe("UserRepository.getUserProfileById", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("returns User when record exists", async () => {
    const dbUser = {
      id: "1",
      userName: "Pepe",
      userEmail: "pepe@gmail.com",
      roles: ["CLIENT"],
      createdAt: new Date(),
      profilePicture: "https://img.png",
      freelancerProfile: null,
      clientProfile: null,
    };
    (PrismaClient.user.findUnique as jest.Mock).mockResolvedValue(dbUser);

    const repo = new UserRepository();
    const user = await repo.getUserProfileById("1");

    expect(PrismaClient.user.findUnique).toHaveBeenCalledWith({
      where: { id: "1" },
      include: { freelancerProfile: true, clientProfile: true },
    });
    expect(user).toBeInstanceOf(User);
    expect(user?.profilePicture).toBe("https://img.png");
  });

  it("returns null when no record exists", async () => {
    (PrismaClient.user.findUnique as jest.Mock).mockResolvedValue(null);

    const repo = new UserRepository();
    const user = await repo.getUserProfileById("1");

    expect(user).toBeNull();
  });
});
