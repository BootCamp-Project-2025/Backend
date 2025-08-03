import { QueryParamsDto } from "@/contexts/CoreContext/domain/interfaces/dtos/search/QueryParamsDto";
import IUseCase from "../../domain/interfaces/IUseCase";
import { PageDto } from "@/contexts/CoreContext/domain/interfaces/dtos/search/PageDto";
import { Course } from "../../domain/aggregates/Course";
import { ISearchService } from "@/contexts/CoreContext/domain/interfaces/services/ISearchService";
import { ParamMapper } from "@/contexts/CoreContext/mappers/ParamsMapper";
import { inject, injectable } from "tsyringe";

const RESOURCE = "course";
const COURSE_FIELDS = [
  "name",
  "description",
  "modules.title",
  "modules.lessons.description",
];

@injectable()
export class SearchCourseUseCase
  implements IUseCase<QueryParamsDto, PageDto<Course>>
{
  constructor(
    @inject("ISearchService")
    private elasticSearchService: ISearchService
  ) {}
  async execute(params: QueryParamsDto): Promise<PageDto<Course>> {
    const searchParams = ParamMapper.queryToSearchParams(
      params,
      COURSE_FIELDS,
      RESOURCE
    );

    const results = await this.elasticSearchService.search(searchParams);
    const courses = results.hits.hits.map((hit) => hit._source as Course);
    const page: PageDto<Course> = {
      data: courses,
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
