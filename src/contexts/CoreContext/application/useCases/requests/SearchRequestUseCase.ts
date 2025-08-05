import { QueryParamsDto } from "@/contexts/CoreContext/domain/interfaces/dtos/search/QueryParamsDto";
import IUseCase from "@/contexts/LearningContext/domain/interfaces/IUseCase";
import { Request } from "@/contexts/CoreContext/domain/aggregates/Request";
import { ParamMapper } from "@/contexts/CoreContext/mappers/ParamsMapper";
import { inject, injectable } from "tsyringe";
import { ISearchService } from "@/contexts/CoreContext/domain/interfaces/services/ISearchService";
import { PageDto } from "@/contexts/CoreContext/domain/interfaces/dtos/search/PageDto";

const RESOURCE = "requests";
const REQUEST_FIELDS = ["title", "description"];

@injectable()
export class SearchRequestUseCase
  implements IUseCase<QueryParamsDto, PageDto<Request>>
{
  constructor(
    @inject("ISearchService")
    private elasticSearchService: ISearchService
  ) {}
  async execute(params: QueryParamsDto): Promise<PageDto<Request>> {
    const searchParams = ParamMapper.queryToSearchParams(
      params,
      REQUEST_FIELDS,
      RESOURCE
    );

    const results = await this.elasticSearchService.search(searchParams);
    const requests = results.hits.hits.map((hit) => hit._source as Request);
    const page: PageDto<Request> = {
      data: requests,
      page: params.page ?? 1,
      size: params.size ?? 10,
      total:
        typeof results.hits.total === "number"
          ? results.hits.total
          : (results.hits.total?.value ?? 0),
    };
    return page;
  }
}
