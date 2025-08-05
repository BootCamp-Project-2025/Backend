import { Request } from "@/contexts/CoreContext/domain/aggregates/Request";
import IRequestRepository from "@/contexts/CoreContext/domain/interfaces/repositories/IRequestRepository";
import RequestMapper from "@/contexts/CoreContext/mappers/RequestMapper";
import IUseCase from "@/contexts/LearningContext/domain/interfaces/IUseCase";
import { IndexResourceEvent } from "@/contexts/Shared/domain/events/IndexResourceEvent";
import { globalEventDispatcher } from "@/eventRegister";
import { inject, injectable } from "tsyringe";

@injectable()
export default class CreateRequestUseCase
  implements IUseCase<Request, Request>
{
  constructor(
    @inject("IRequestRepository")
    private readonly repository: IRequestRepository
  ) {}
  async execute(request: Request): Promise<Request> {
    const savedRequest = await this.repository.create(request);

    const event = new IndexResourceEvent({
      resource: "requests",
      resourceDto: RequestMapper.domainToIndex(savedRequest),
    });

    globalEventDispatcher.dispatch(event);

    return savedRequest;
  }
}
