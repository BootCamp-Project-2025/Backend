import { QueryParamsDto } from "../domain/interfaces/dtos/search/QueryParamsDto";
import { SearchQueryDto } from "../domain/interfaces/dtos/search/SearchQueryDto";

export const queryToSearchParams = (
  query: QueryParamsDto,
  multimatchFields: string[],
  resource: string
): SearchQueryDto => {
  const filters: Record<string, { [key: string]: string }>[] = [];

  if (query.category) filters.push({ term: { category: query.category } });
  if (query.language) filters.push({ term: { language: query.language } });
  if (query.subcategory)
    filters.push({ term: { subcategory: query.subcategory } });

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
};
