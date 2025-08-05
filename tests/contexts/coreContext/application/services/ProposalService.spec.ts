import "reflect-metadata";
import { ProposalService } from "@/contexts/CoreContext/application/services/ProposalService";
import IUseCase from "@/contexts/LearningContext/domain/interfaces/IUseCase";
import { Proposal } from "@/contexts/CoreContext/domain/entities/Proposal";

describe("ProposalService", () => {
  let service: ProposalService;
  let mockCreateUseCase: jest.Mocked<IUseCase<Proposal, Proposal>>;
  let mockGetByChatIdUseCase: jest.Mocked<IUseCase<string, Proposal>>;
  let mockUpdateUseCase: jest.Mocked<
    IUseCase<{ proposalId: string; proposal: Proposal }, Proposal>
  >;
  let mockGetUserProposalsUseCase: jest.Mocked<IUseCase<string, Proposal[]>>;

  beforeEach(() => {
    mockCreateUseCase = { execute: jest.fn() };
    mockGetByChatIdUseCase = { execute: jest.fn() };
    mockUpdateUseCase = { execute: jest.fn() };
    mockGetUserProposalsUseCase = { execute: jest.fn() };

    service = new ProposalService(
      mockCreateUseCase,
      mockGetByChatIdUseCase,
      mockUpdateUseCase,
      mockGetUserProposalsUseCase
    );
  });

  it("should call create use case", async () => {
    const proposal = {} as Proposal;
    mockCreateUseCase.execute.mockResolvedValue(proposal);

    const result = await service.create(proposal);
    expect(result).toBe(proposal);
    expect(mockCreateUseCase.execute).toHaveBeenCalledWith(proposal);
  });

  it("should call getByChatId use case", async () => {
    const proposal = {} as Proposal;
    mockGetByChatIdUseCase.execute.mockResolvedValue(proposal);

    const result = await service.getByChatId("chat-1");
    expect(result).toBe(proposal);
    expect(mockGetByChatIdUseCase.execute).toHaveBeenCalledWith("chat-1");
  });

  it("should call update use case", async () => {
    const proposal = {} as Proposal;
    mockUpdateUseCase.execute.mockResolvedValue(proposal);

    const result = await service.update("123", proposal);
    expect(result).toBe(proposal);
    expect(mockUpdateUseCase.execute).toHaveBeenCalledWith({
      proposalId: "123",
      proposal,
    });
  });

  it("should call getByUserId use case", async () => {
    const proposals: Proposal[] = [{} as Proposal];
    mockGetUserProposalsUseCase.execute.mockResolvedValue(proposals);

    const result = await service.getByUserId("user-1");
    expect(result).toBe(proposals);
    expect(mockGetUserProposalsUseCase.execute).toHaveBeenCalledWith("user-1");
  });
});
