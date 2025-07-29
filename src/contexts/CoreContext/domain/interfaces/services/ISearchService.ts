import { SearchResponse } from "@elastic/elasticsearch/lib/api/types";
import { SearchQueryDto } from "../dtos/search/SearchQueryDto";
import { CourseDTO } from "@/contexts/LearningContext/domain/dtos/CourseDTO";
import { RequestDto } from "../dtos/RequestDto";

export interface ISearchService {
  search(params: SearchQueryDto): Promise<SearchResponse>;
  indexResource(
    resource: string,
    resourceDto: CourseDTO | RequestDto
  ): Promise<void>;
}
