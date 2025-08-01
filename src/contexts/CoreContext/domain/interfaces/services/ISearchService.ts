import { SearchResponse } from "@elastic/elasticsearch/lib/api/types";
import { SearchQueryDto } from "../dtos/search/SearchQueryDto";
import { RequestDto } from "../dtos/RequestDto";
import { CourseIndex } from "@/contexts/LearningContext/domain/dtos/CourseIndex";

export interface ISearchService {
  search(params: SearchQueryDto): Promise<SearchResponse>;
  indexResource(
    resource: string,
    resourceDto: CourseIndex | RequestDto
  ): Promise<void>;
  removeResource(resource: string, resourceId: string): Promise<void>;
  updateResource(
    resource: string,
    resourceDto: CourseIndex | RequestDto
  ): Promise<void>;
}
