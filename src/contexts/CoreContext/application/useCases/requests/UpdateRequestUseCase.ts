import { inject, injectable } from "tsyringe";
import IUseCase from "@/contexts/LearningContext/domain/interfaces/IUseCase";
import { Request } from "@/contexts/CoreContext/domain/aggregates/Request";
import IRequestRepository from "@/contexts/CoreContext/domain/interfaces/repositories/IRequestRepository";

@injectable()
export default class UpdateRequestUseCase
  implements IUseCase<{ requestId: string; request: Request }, Request>
{
  constructor(
    @inject("IRequestRepository")
    private readonly repository: IRequestRepository
  ) {}

  async execute({
    requestId,
    request,
  }: {
    requestId: string;
    request: Request;
  }): Promise<Request> {
    return await this.repository.update(requestId, request);
  }
}
