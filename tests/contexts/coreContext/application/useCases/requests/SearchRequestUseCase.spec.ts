import "reflect-metadata";
import { SearchRequestUseCase } from "@/contexts/CoreContext/application/useCases/requests/SearchRequestUseCase";
import { QueryParamsDto } from "@/contexts/CoreContext/domain/interfaces/dtos/search/QueryParamsDto";
import { ISearchService } from "@/contexts/CoreContext/domain/interfaces/services/ISearchService";
import { ParamMapper } from "@/contexts/CoreContext/mappers/ParamsMapper";
import { SearchResponse } from "@elastic/elasticsearch/lib/api/types";

describe("SearchRequestUseCase", () => {
  let useCase: SearchRequestUseCase;
  let mockSearchService: jest.Mocked<ISearchService>;
  const RESOURCE = "requests";
  const REQUEST_FIELDS = ["title", "description"];

  beforeEach(() => {
    mockSearchService = {
      search: jest.fn(),
    } as unknown as jest.Mocked<ISearchService>;

    useCase = new SearchRequestUseCase(mockSearchService);
  });

  describe("searchParams generation", () => {
    it("should generate correct search params with basic query", async () => {
      const queryParams: QueryParamsDto = {
        query: "test query",
        page: 1,
        size: 10,
      };

      const expectedSearchParams = ParamMapper.queryToSearchParams(
        queryParams,
        REQUEST_FIELDS,
        RESOURCE
      );

      mockSearchService.search.mockResolvedValue({
        hits: {
          hits: [],
          total: 0,
        },
      } as unknown as SearchResponse);

      await useCase.execute(queryParams);

      expect(mockSearchService.search).toHaveBeenCalledWith(
        expectedSearchParams
      );
    });

    it("should generate search params with correct fields and resource", async () => {
      const queryParams: QueryParamsDto = {
        query: "search term",
        page: 2,
        size: 20,
      };

      mockSearchService.search.mockResolvedValue({
        hits: {
          hits: [],
          total: 0,
        },
      } as unknown as SearchResponse);

      const paramMapperSpy = jest.spyOn(ParamMapper, "queryToSearchParams");

      await useCase.execute(queryParams);

      expect(paramMapperSpy).toHaveBeenCalledWith(
        queryParams,
        ["title", "description"],
        "requests"
      );
    });

    it("should generate search params with default pagination when not provided", async () => {
      const queryParams: QueryParamsDto = {
        query: "test",
      };

      mockSearchService.search.mockResolvedValue({
        hits: {
          hits: [],
          total: 0,
        },
      } as unknown as SearchResponse);

      const paramMapperSpy = jest.spyOn(ParamMapper, "queryToSearchParams");

      await useCase.execute(queryParams);

      expect(paramMapperSpy).toHaveBeenCalledWith(
        queryParams,
        REQUEST_FIELDS,
        RESOURCE
      );
    });
  });
});
