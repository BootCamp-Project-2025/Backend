import "reflect-metadata";
import { Request } from "express";
import { QueryParamsDto } from "@/contexts/CoreContext/domain/interfaces/dtos/search/QueryParamsDto";
import { ParamMapper } from "@/contexts/CoreContext/mappers/ParamsMapper";

describe("ParamMapper", () => {
  describe("queryToSearchParams", () => {
    const multimatchFields = ["title", "description"];
    const resource = "requests";

    it("should generate correct search params with basic query", () => {
      const query: QueryParamsDto = {
        query: "test query",
        page: 1,
        size: 10,
      };

      const result = ParamMapper.queryToSearchParams(
        query,
        multimatchFields,
        resource
      );

      expect(result).toEqual({
        index: resource,
        query: {
          bool: {
            must: [
              {
                multi_match: {
                  query: "test query",
                  fields: multimatchFields,
                  fuzziness: "AUTO",
                },
              },
            ],
            filter: [],
          },
        },
        from: 0,
        size: 10,
        sort: undefined,
      });
    });

    it("should generate match_all query when no query provided", () => {
      const query: QueryParamsDto = {
        page: 1,
        size: 10,
      };

      const result = ParamMapper.queryToSearchParams(
        query,
        multimatchFields,
        resource
      );

      expect(result.query?.bool?.must).toEqual([{ match_all: {} }]);
    });

    it("should trim query string", () => {
      const query: QueryParamsDto = {
        query: "  test query  ",
        page: 1,
        size: 10,
      };

      const result = ParamMapper.queryToSearchParams(
        query,
        multimatchFields,
        resource
      );

      expect(result.query?.bool?.must?.[0]).toEqual({
        multi_match: {
          query: "test query",
          fields: multimatchFields,
          fuzziness: "AUTO",
        },
      });
    });

    it("should apply category filter", () => {
      const query: QueryParamsDto = {
        query: "test",
        category: "technology",
        page: 1,
        size: 10,
      };

      const result = ParamMapper.queryToSearchParams(
        query,
        multimatchFields,
        resource
      );

      expect(result.query?.bool?.filter).toContainEqual({
        term: { "category.keyword": "technology" },
      });
    });

    it("should apply language filter", () => {
      const query: QueryParamsDto = {
        query: "test",
        language: "english",
        page: 1,
        size: 10,
      };

      const result = ParamMapper.queryToSearchParams(
        query,
        multimatchFields,
        resource
      );

      expect(result.query?.bool?.filter).toContainEqual({
        term: { "language.keyword": "english" },
      });
    });

    it("should apply subcategory filter", () => {
      const query: QueryParamsDto = {
        query: "test",
        subcategory: "frontend",
        page: 1,
        size: 10,
      };

      const result = ParamMapper.queryToSearchParams(
        query,
        multimatchFields,
        resource
      );

      expect(result.query?.bool?.filter).toContainEqual({
        term: { "subCategory.keyword": "frontend" },
      });
    });

    it("should apply multiple filters", () => {
      const query: QueryParamsDto = {
        query: "test",
        category: "technology",
        language: "english",
        subcategory: "frontend",
        page: 1,
        size: 10,
      };

      const result = ParamMapper.queryToSearchParams(
        query,
        multimatchFields,
        resource
      );

      expect(result.query?.bool?.filter).toHaveLength(3);
      expect(result.query?.bool?.filter).toContainEqual({
        term: { "category.keyword": "technology" },
      });
      expect(result.query?.bool?.filter).toContainEqual({
        term: { "language.keyword": "english" },
      });
      expect(result.query?.bool?.filter).toContainEqual({
        term: { "subCategory.keyword": "frontend" },
      });
    });

    it("should calculate correct pagination", () => {
      const query: QueryParamsDto = {
        query: "test",
        page: 3,
        size: 20,
      };

      const result = ParamMapper.queryToSearchParams(
        query,
        multimatchFields,
        resource
      );

      expect(result.from).toBe(40);
      expect(result.size).toBe(20);
    });

    it("should use default pagination when not provided", () => {
      const query: QueryParamsDto = {
        query: "test",
      };

      const result = ParamMapper.queryToSearchParams(
        query,
        multimatchFields,
        resource
      );

      expect(result.from).toBe(0);
      expect(result.size).toBe(10);
    });

    it("should not apply sort when order is invalid", () => {
      const query: QueryParamsDto = {
        query: "test",
        sort: "invalid" as any,
        order: "title" as any,
        page: 1,
        size: 10,
      };

      const result = ParamMapper.queryToSearchParams(
        query,
        multimatchFields,
        resource
      );

      expect(result.sort).toBeUndefined();
    });

    it("should not apply sort when sort field is not provided", () => {
      const query: QueryParamsDto = {
        query: "test",
        order: "asc",
        page: 1,
        size: 10,
      };

      const result = ParamMapper.queryToSearchParams(
        query,
        multimatchFields,
        resource
      );

      expect(result.sort).toBeUndefined();
    });
  });

  describe("expressQueryToDto", () => {
    it("should convert express query to DTO with all parameters", () => {
      const mockRequest = {
        query: {
          query: "test query",
          page: "2",
          size: "20",
          order: "asc",
          sort: "desc",
          category: "TECHNOLOGY",
          subcategory: "FRONTEND",
          language: "ENGLISH",
        },
      } as unknown as Request;

      const result = ParamMapper.expressQueryToDto(mockRequest);

      expect(result).toEqual({
        query: "test query",
        page: 2,
        size: 20,
        order: "asc",
        sort: "desc",
        category: "technology",
        subcategory: "frontend",
        language: "english",
      });
    });

    it("should use default values when parameters not provided", () => {
      const mockRequest = {
        query: {},
      } as unknown as Request;

      const result = ParamMapper.expressQueryToDto(mockRequest);

      expect(result).toEqual({
        query: undefined,
        page: 1,
        size: 10,
        order: undefined,
        sort: undefined,
        category: undefined,
        subcategory: undefined,
        language: undefined,
      });
    });

    it("should handle partial parameters", () => {
      const mockRequest = {
        query: {
          query: "search term",
          category: "tech",
        },
      } as unknown as Request;

      const result = ParamMapper.expressQueryToDto(mockRequest);

      expect(result).toEqual({
        query: "search term",
        page: 1,
        size: 10,
        order: undefined,
        sort: undefined,
        category: "tech",
        subcategory: undefined,
        language: undefined,
      });
    });

    it("should convert string numbers to numbers", () => {
      const mockRequest = {
        query: {
          page: "5",
          size: "25",
        },
      } as unknown as Request;

      const result = ParamMapper.expressQueryToDto(mockRequest);

      expect(result.page).toBe(5);
      expect(result.size).toBe(25);
    });

    it("should lowercase category, subcategory, and language", () => {
      const mockRequest = {
        query: {
          category: "TECHNOLOGY",
          subcategory: "BACKEND",
          language: "SPANISH",
        },
      } as unknown as Request;

      const result = ParamMapper.expressQueryToDto(mockRequest);

      expect(result.category).toBe("technology");
      expect(result.subcategory).toBe("backend");
      expect(result.language).toBe("spanish");
    });
  });
});
