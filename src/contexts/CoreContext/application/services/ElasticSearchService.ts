import { injectable } from "tsyringe";
import { SearchQueryDto } from "../../domain/interfaces/dtos/search/SearchQueryDto";
import { ISearchService } from "../../domain/interfaces/services/ISearchService";
import { Client } from "@elastic/elasticsearch";
import { SearchResponse } from "@elastic/elasticsearch/lib/api/types";
import { CourseDTO } from "@/contexts/LearningContext/domain/dtos/CourseDTO";
import { RequestDto } from "../../domain/interfaces/dtos/RequestDto";

@injectable()
export class ElasticSearchService implements ISearchService {
  esClient: Client;

  constructor() {
    this.esClient = new Client({
      node: "http://localhost:9200",
      auth: {
        username: "elastic",
        password: "5tuXfkkZ",
      },
    });
  }

  async search(params: SearchQueryDto): Promise<SearchResponse> {
    return await this.esClient.search(params);
  }

  async indexResource(
    resource: string,
    resourceDto: CourseDTO | RequestDto
  ): Promise<void> {
    await this.esClient.index({
      index: resource,
      document: resourceDto,
    });
  }
}
