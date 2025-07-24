import { Request } from "@/contexts/CoreContext/domain/aggregates/Request";
import IRequestRepository from "@/contexts/CoreContext/domain/interfaces/repositories/IRequestRepository";
import IUseCase from "@/contexts/LearningContext/domain/interfaces/IUseCase";
import { inject, injectable } from "tsyringe";

@injectable()
export default class GetUserActiveRequestUseCase
  implements IUseCase<{ userId: string; title: string }, Request[]>
{
  constructor(
    @inject("IRequestRepository")
    private readonly repository: IRequestRepository
  ) {}
  async execute({
    userId,
    title,
  }: {
    userId: string;
    title: string;
  }): Promise<Request[]> {
    return await this.repository.findAllActiveByUserId(userId, title);
  }
}
