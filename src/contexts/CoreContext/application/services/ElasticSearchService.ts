import { injectable } from "tsyringe";
import { SearchQueryDto } from "../../domain/interfaces/dtos/search/SearchQueryDto";
import { ISearchService } from "../../domain/interfaces/services/ISearchService";
import { Client } from "@elastic/elasticsearch";
import { SearchResponse } from "@elastic/elasticsearch/lib/api/types";
import { RequestDto } from "../../domain/interfaces/dtos/RequestDto";
import dotenv from "dotenv";
import { CourseIndex } from "@/contexts/LearningContext/domain/dtos/CourseIndex";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { StatusCodes } from "http-status-codes";

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

  async updateResource(
    resource: string,
    resourceDto: CourseIndex | RequestDto
  ): Promise<void> {
    try {
      await this.esClient.update({
        index: resource,
        id: resourceDto.id as string,
        doc: resourceDto,
        doc_as_upsert: true,
      });
    } catch (error) {
      console.error("Method not implemented.", error);
    }
  }

  async search(params: SearchQueryDto): Promise<SearchResponse> {
    try {
      return await this.esClient.search(params);
    } catch (error) {
      console.error(error);
      throw new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "An error occurred when try to search a resource"
      );
    }
  }

  async indexResource(
    resource: string,
    resourceDto: CourseIndex | RequestDto
  ): Promise<void> {
    try {
      await this.esClient.index({
        index: resource,
        document: resourceDto,
        id: resourceDto.id,
      });
    } catch (error) {
      console.error("An error has occured when try to index a Resource", error);
    }
  }

  async removeResource(resource: string, resourceId: string): Promise<void> {
    try {
      await this.esClient.delete({
        index: resource,
        id: resourceId,
      });
    } catch (error) {
      console.error(
        "An error has occured when try to remove a resource",
        error
      );
    }
  }
}
