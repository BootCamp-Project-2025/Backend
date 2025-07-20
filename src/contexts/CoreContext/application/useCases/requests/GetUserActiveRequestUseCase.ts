import { Request } from "@/contexts/CoreContext/domain/aggregates/Request";
import IRequestRepository from "@/contexts/CoreContext/domain/interfaces/repositories/IRequestRepository";
import IUseCase from "@/contexts/LearningContext/domain/interfaces/IUseCase";
import { inject } from "tsyringe";

export default class GetUserActiveRequestUseCase
  implements IUseCase<string, Request[]>
{
  constructor(
    @inject("IRequestRepository")
    private readonly repository: IRequestRepository
  ) {}
  async execute(userId: string): Promise<Request[]> {
    return await this.repository.findAllActiveByUserId(userId);
  }
}
