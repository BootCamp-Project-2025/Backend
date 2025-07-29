import { injectable } from "tsyringe";
import { SearchQueryDto } from "../../domain/interfaces/dtos/search/SearchQueryDto";
import { ISearchService } from "../../domain/interfaces/services/ISearchService";
import { Client } from "@elastic/elasticsearch";
import { SearchResponse } from "@elastic/elasticsearch/lib/api/types";

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
}
