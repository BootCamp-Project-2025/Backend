import { inject, injectable } from "tsyringe";
import IRequestService from "../../domain/interfaces/services/IRequestService";
import { Request } from "../../domain/aggregates/Request";
import IUseCase from "@/contexts/LearningContext/domain/interfaces/IUseCase";
import { QueryParamsDto } from "../../domain/interfaces/dtos/search/QueryParamsDto";
import { PageDto } from "../../domain/interfaces/dtos/search/PageDto";

@injectable()
export default class RequestService implements IRequestService {
  constructor(
    @inject("DeleteRequestUseCase")
    private readonly deleteRequestUseCase: IUseCase<string, void>,
    @inject("CreateRequestUseCase")
    private readonly createRequestUseCase: IUseCase<Request, Request>,
    @inject("GetUserActiveRequestUseCase")
    private readonly getUserActiveRequestUseCase: IUseCase<
      { userId: string; title: string },
      Request[]
    >,
    @inject("SearchRequestUseCase")
    private readonly searchRequestUseCase: IUseCase<
      QueryParamsDto,
      PageDto<Request>
    >
  ) {}
  async delete(requestId: string): Promise<void> {
    await this.deleteRequestUseCase.execute(requestId);
  }
  async create(request: Request): Promise<Request> {
    return await this.createRequestUseCase.execute(request);
  }
  async getUserActiveRequest(
    userId: string,
    title: string
  ): Promise<Request[]> {
    return await this.getUserActiveRequestUseCase.execute({ userId, title });
  }

  async searchRequest(params: QueryParamsDto): Promise<PageDto<Request>> {
    return await this.searchRequestUseCase.execute(params);
  }
}
