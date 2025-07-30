import { Request } from "express";
import { QueryParamsDto } from "../domain/interfaces/dtos/search/QueryParamsDto";
import { SearchQueryDto } from "../domain/interfaces/dtos/search/SearchQueryDto";

export const ParamMapper = {
  queryToSearchParams: (
    query: QueryParamsDto,
    multimatchFields: string[],
    resource: string
  ): SearchQueryDto => {
    const filters: Record<string, { [key: string]: string }>[] = [];

    if (query.category)
      filters.push({ term: { "category.keyword": query.category } });
    if (query.language)
      filters.push({ term: { "language.keyword": query.language } });
    if (query.subcategory)
      filters.push({ term: { "subcategory.keyword": query.subcategory } });

    const trimmedQuery = query.query?.trim();

    const mustClause = trimmedQuery
      ? [
          {
            multi_match: {
              query: trimmedQuery,
              fields: multimatchFields,
              fuzziness: "AUTO" as const,
            },
          },
        ]
      : [{ match_all: {} }];

    const size = Number(query.size) || 10;
    const page = Number(query.page) || 1;
    const from = (page - 1) * size;

    const sort =
      query.sort && (query.order === "asc" || query.order === "desc")
        ? ([{ [query.sort]: { order: query.order as "asc" | "desc" } }] as [
            { [key: string]: { order: "asc" | "desc" } },
          ])
        : undefined;

    return {
      index: resource,
      query: {
        bool: {
          must: mustClause,
          filter: filters,
        },
      },
      from,
      size,
      sort,
    };
  },

  expressQueryToDto(request: Request): QueryParamsDto {
    return {
      query: request.query.query as string,
      page: request.query.page ? Number(request.query.page) : 1,
      size: request.query.size ? Number(request.query.size) : 10,
      order: request.query.order as string,
      sort: request.query.sort as "asc" | "desc",
      category: request.query.category as string,
      subcategory: request.query.subcategory as string,
      language: request.query.language as string,
    };
  },
};
