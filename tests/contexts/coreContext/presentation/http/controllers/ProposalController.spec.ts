import "reflect-metadata";
import { ProposalService } from "@/contexts/CoreContext/application/services/ProposalService";
import ProposalMapper from "@/contexts/CoreContext/mappers/ProposalMapper";
import { ResponseService } from "@/contexts/Shared/application/services/ResponseService";
import { StatusCodes } from "http-status-codes";
import { SuccessResponseEntity } from "@/contexts/Shared/domain/entity/SuccessResponseEntity";
import { Request, Response } from "express";
import { Proposal } from "@/contexts/CoreContext/domain/entities/Proposal";
import { ProposalController } from "@/contexts/CoreContext/presentation/http/controllers/ProposalController";
const createMockProposal = (id: string, description = "desc") =>
  ({
    id: { toValue: () => id },
    requestId: { toString: () => "req-1" },
    userId: { toString: () => "user-1" },
    description,
    sessions: [],
    createdAt: new Date(),
    status: { value: "NEW" },
    chatId: { toString: () => "chat-1" },
    reject: jest.fn(),
    accept: jest.fn(),
  }) as unknown as Proposal;

describe("ProposalController", () => {
  let controller: ProposalController;
  let mockProposalService: jest.Mocked<ProposalService>;
  let mockRes: Partial<Response>;

  beforeEach(() => {
    mockProposalService = {
      create: jest.fn(),
      getByChatId: jest.fn(),
      update: jest.fn(),
      getByUserId: jest.fn(),
    } as unknown as jest.Mocked<ProposalService>;

    controller = new ProposalController(mockProposalService);

    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    jest.spyOn(ResponseService, "send").mockImplementation((res, response) => {
      (res as Response).status(response.statusCode).json(response);
    });

    jest
      .spyOn(ProposalMapper, "dtoToDomain")
      .mockImplementation((dto) => dto as any);
    jest
      .spyOn(ProposalMapper, "DomainToDto")
      .mockImplementation((domain) => domain as any);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should create a proposal", async () => {
    const mockReq = { body: { description: "test" } } as Request;
    const createdProposal = createMockProposal("123", "test");

    mockProposalService.create.mockResolvedValue(createdProposal);

    await controller.create(mockReq, mockRes as Response);

    expect(ProposalMapper.dtoToDomain).toHaveBeenCalledWith(mockReq.body);
    expect(mockProposalService.create).toHaveBeenCalledWith(
      expect.any(Object) // la entidad ya mapeada
    );
    expect(ProposalMapper.DomainToDto).toHaveBeenCalledWith(createdProposal);
    expect(ResponseService.send).toHaveBeenCalledWith(
      mockRes,
      expect.any(SuccessResponseEntity)
    );
    expect(mockRes.status).toHaveBeenCalledWith(StatusCodes.CREATED);
  });

  it("should get proposal by chatId", async () => {
    const mockReq = { params: { proposalId: "123" } } as unknown as Request;

    const mockProposal = {
      id: { toValue: () => "123" },
      requestId: { toString: () => "req-1" },
      userId: { toString: () => "user-1" },
      description: "Test proposal",
      sessions: [],
      createdAt: new Date(),
      status: { value: "NEW" },
      chatId: { toString: () => "chat-1" },
      reject: jest.fn(),
      accept: jest.fn(),
    } as unknown as Proposal;

    mockProposalService.getByChatId.mockResolvedValue(mockProposal);

    await controller.getByChatId(mockReq, mockRes as Response);

    expect(mockProposalService.getByChatId).toHaveBeenCalledWith("123");
    expect(ResponseService.send).toHaveBeenCalledWith(
      mockRes,
      expect.any(SuccessResponseEntity)
    );
  });

  it("should update a proposal", async () => {
    const mockReq = {
      params: { proposalId: "123" },
      body: { description: "updated" },
    } as unknown as Request;

    const updatedProposal = createMockProposal("123", "updated");
    mockProposalService.update.mockResolvedValue(updatedProposal);

    await controller.update(mockReq, mockRes as Response);

    expect(mockProposalService.update).toHaveBeenCalledWith(
      "123",
      expect.any(Object)
    );
    expect(ResponseService.send).toHaveBeenCalledWith(
      mockRes,
      expect.any(SuccessResponseEntity)
    );
  });

  it("should get proposals by userId", async () => {
    const mockReq = { params: { userId: "456" } } as unknown as Request;

    const proposals = [createMockProposal("1"), createMockProposal("2")];
    mockProposalService.getByUserId.mockResolvedValue(proposals);

    await controller.getByUserId(mockReq, mockRes as Response);

    expect(mockProposalService.getByUserId).toHaveBeenCalledWith("456");
    expect(ResponseService.send).toHaveBeenCalledWith(
      mockRes,
      expect.any(SuccessResponseEntity)
    );
    expect(mockRes.status).toHaveBeenCalledWith(StatusCodes.OK);
  });
});
