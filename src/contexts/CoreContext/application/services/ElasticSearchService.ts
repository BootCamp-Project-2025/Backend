import { injectable } from "tsyringe";
import { SearchQueryDto } from "../../domain/interfaces/dtos/search/SearchQueryDto";
import { ISearchService } from "../../domain/interfaces/services/ISearchService";
import { Client } from "@elastic/elasticsearch";
import { SearchResponse } from "@elastic/elasticsearch/lib/api/types";
import { CourseDTO } from "@/contexts/LearningContext/domain/dtos/CourseDTO";
import { RequestDto } from "../../domain/interfaces/dtos/RequestDto";
import dotenv from "dotenv";

dotenv.config();

@injectable()
export class ElasticSearchService implements ISearchService {
  esClient: Client;

  constructor() {
    this.esClient = new Client({
      node: process.env.ELASTICSEARCH_URL || "http://localhost:9200",
      auth: {
        username: process.env.ELASTICSEARCH_USER || "elastic",
        password: process.env.ELASTICSEARCH_PASSWORD || "5tuXfkkZ",
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
      id: resourceDto.id,
    });
  }

  async removeResource(resource: string, resourceId: string): Promise<void> {
    await this.esClient.delete({
      index: resource,
      id: resourceId,
    });
  }
}
