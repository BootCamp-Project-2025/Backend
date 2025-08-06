import { ProposalService } from "@/contexts/CoreContext/application/services/ProposalService";
import { IProposalController } from "@/contexts/CoreContext/domain/interfaces/controllers/IProposalController";
import { ProposalDto } from "@/contexts/CoreContext/domain/interfaces/dtos/ProposalDto";
import ProposalMapper from "@/contexts/CoreContext/mappers/ProposalMapper";
import { ResponseService } from "@/contexts/Shared/application/services/ResponseService";
import { SuccessResponseEntity } from "@/contexts/Shared/domain/entity/SuccessResponseEntity";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { inject, injectable } from "tsyringe";

@injectable()
export class ProposalController implements IProposalController {
  constructor(
    @inject("IProposalService")
    private proposalService: ProposalService
  ) {}

  create = async (req: Request, res: Response): Promise<void> => {
    const proposal = req.body as ProposalDto;
    const proposalDomain = ProposalMapper.dtoToDomain(proposal);
    const newProposalDomain = await this.proposalService.create(proposalDomain);
    const newProposalDto = ProposalMapper.DomainToDto(newProposalDomain);
    const response = new SuccessResponseEntity(
      newProposalDto,
      StatusCodes.CREATED,
      "Proposal saved successfully"
    );
    ResponseService.send(res, response);
  };

  getByChatId = async (req: Request, res: Response): Promise<void> => {
    const { chatId } = req.params;
    const proposalDomain = await this.proposalService.getByChatId(chatId);
    const proposalDto = ProposalMapper.DomainToDto(proposalDomain);
    const response = new SuccessResponseEntity(
      proposalDto,
      StatusCodes.CREATED,
      "Proposal saved successfully"
    );
    ResponseService.send(res, response);
  };

  update = async (req: Request, res: Response): Promise<void> => {
    const { proposalId } = req.params;
    const proposal = req.body as ProposalDto;
    const proposalDomain = ProposalMapper.dtoToDomain(proposal);
    const updatedProposalDomain = await this.proposalService.update(
      proposalId,
      proposalDomain
    );
    const proposalDto = ProposalMapper.DomainToDto(updatedProposalDomain);
    const response = new SuccessResponseEntity(
      proposalDto,
      StatusCodes.CREATED,
      "Proposal saved successfully"
    );
    ResponseService.send(res, response);
  };

  getByUserId = async (req: Request, res: Response): Promise<void> => {
    const { userId } = req.params;
    const proposalsDomain = await this.proposalService.getByUserId(userId);

    const proposalsDto = proposalsDomain.map(ProposalMapper.DomainToDto);
    const response = new SuccessResponseEntity(
      proposalsDto,
      StatusCodes.OK,
      "Proposals fetched successfully"
    );
    ResponseService.send(res, response);
  };
}
