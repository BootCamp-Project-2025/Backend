import { Request } from "@/contexts/CoreContext/domain/aggregates/Request";
import IRequestRepository from "@/contexts/CoreContext/domain/interfaces/repositories/IRequestRepository";
import IUseCase from "@/contexts/LearningContext/domain/interfaces/IUseCase";
import { inject, injectable } from "tsyringe";

@injectable()
export default class GetRequestUseCase
  implements IUseCase<string, Request | null>
{
  constructor(
    @inject("IRequestRepository")
    private readonly repository: IRequestRepository
  ) {}

  async execute(requestId: string): Promise<Request | null> {
    return await this.repository.findById(requestId);
  }
}
