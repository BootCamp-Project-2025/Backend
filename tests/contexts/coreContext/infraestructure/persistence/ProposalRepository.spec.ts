import "reflect-metadata";
import { ProposalRepository } from "@/contexts/CoreContext/infrastructure/persistence/ProposalRepository";
import PrismaClient from "@/contexts/Shared/infrastructure/database/PrismaClient";
import ProposalMapper from "@/contexts/CoreContext/mappers/ProposalMapper";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
const mockDomainProposal = {
  userId: { toString: () => "user-1" },
  chatId: { toString: () => "chat-1" },
  requestId: { toString: () => "req-1" },
  description: "description",
  sessions: [],
  status: { value: "NEW" },
};
jest.mock("@/contexts/Shared/infrastructure/database/PrismaClient", () => ({
  __esModule: true,
  default: {
    user: { findUniqueOrThrow: jest.fn() },
    chat: { findUniqueOrThrow: jest.fn() },
    request: { findUniqueOrThrow: jest.fn() },
    proposal: {
      create: jest.fn(),
      update: jest.fn(),
      findFirstOrThrow: jest.fn(),
      findMany: jest.fn(),
    },
  },
}));
jest.mock("@/contexts/CoreContext/mappers/ProposalMapper");

describe("ProposalRepository", () => {
  let repository: ProposalRepository;
  const mockProposal = { id: "123" };

  beforeEach(() => {
    repository = new ProposalRepository();
    jest.clearAllMocks();
  });

  describe("create", () => {
    it("should create a proposal successfully", async () => {
      (PrismaClient.user.findUniqueOrThrow as jest.Mock).mockResolvedValue({});
      (PrismaClient.chat.findUniqueOrThrow as jest.Mock).mockResolvedValue({});
      (PrismaClient.request.findUniqueOrThrow as jest.Mock).mockResolvedValue(
        {}
      );
      (PrismaClient.proposal.create as jest.Mock).mockResolvedValue(
        mockProposal
      );
      (ProposalMapper.dtoToDomain as jest.Mock).mockReturnValue(mockProposal);

      const result = await repository.create(mockDomainProposal as any);

      expect(result).toEqual(mockProposal);
      expect(ProposalMapper.dtoToDomain).toHaveBeenCalledWith(mockProposal);
    });

    it("should throw ApiError on unknown error", async () => {
      (PrismaClient.user.findUniqueOrThrow as jest.Mock).mockRejectedValue(
        new Error("DB error")
      );
      await expect(repository.create(mockProposal as any)).rejects.toThrow(
        ApiError
      );
    });
  });

  describe("getByChatId", () => {
    it("should return a proposal by chatId", async () => {
      (PrismaClient.proposal.findFirstOrThrow as jest.Mock).mockResolvedValue(
        mockProposal
      );
      (ProposalMapper.dtoToDomain as jest.Mock).mockReturnValue(mockProposal);

      const result = await repository.getByChatId("chat-1");
      expect(result).toEqual(mockProposal);
    });
  });

  describe("findAllByUserId", () => {
    it("should return proposals for user", async () => {
      const mockProposals = [mockProposal, mockProposal];
      (PrismaClient.proposal.findMany as jest.Mock).mockResolvedValue(
        mockProposals
      );
      (ProposalMapper.bulkDtoToDomain as jest.Mock).mockReturnValue(
        mockProposals
      );

      const result = await repository.findAllByUserId("user-1");

      expect(result).toEqual(mockProposals);
      expect(ProposalMapper.bulkDtoToDomain).toHaveBeenCalledWith(
        mockProposals
      );
    });
  });
});
