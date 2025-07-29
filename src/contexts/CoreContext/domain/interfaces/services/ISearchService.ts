import { PageDto } from "../dtos/search/PageDto";
import { SearchQueryDto } from "../dtos/search/SearchQueryDto";

export interface ISearchService {
  search(params: SearchQueryDto): Promise<PageDto>;
}
