import { inject, injectable } from "tsyringe";
import IRequestService from "../../domain/interfaces/services/IRequestService";
import { Request } from "../../domain/aggregates/Request";
import IUseCase from "@/contexts/LearningContext/domain/interfaces/IUseCase";

injectable();
export default class RequestServicec implements IRequestService {
  constructor(
    @inject("DeleteRequestUseCase")
    private readonly deleteRequestUseCase: IUseCase<string, void>,
    @inject("CreateRequestUseCase")
    private readonly createRequestUseCase: IUseCase<Request, Request>,
    @inject("GetUserActiveRequestUseCase")
    private readonly getUserActiveRequestUseCase: IUseCase<string, Request[]>
  ) {}

  async delete(requestId: string): Promise<void> {
    await this.deleteRequestUseCase.execute(requestId);
  }
  async create(request: Request): Promise<Request> {
    return await this.createRequestUseCase.execute(request);
  }
  async getUserActiveRequest(clientId: string): Promise<Request[]> {
    return await this.getUserActiveRequestUseCase.execute(clientId);
  }
}
