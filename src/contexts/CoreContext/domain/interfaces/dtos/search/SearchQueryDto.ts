export interface SearchQueryDto {
  index: string;
  query?: {
    bool?: {
      must?:
        | Array<{
            multi_match: {
              query: string;
              fields: string[];
              fuzziness?: "AUTO" | "0" | "1" | "2";
            };
          }>
        | Array<{
            match_all: object;
          }>;
      filter?: Record<string, { [key: string]: string }>[];
    };
  };
  from?: number;
  size?: number;
  sort?: [{ [key: string]: { order: "asc" | "desc" } }];
}
