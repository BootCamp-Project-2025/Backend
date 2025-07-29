export interface QueryParamsDto {
  query?: string;
  page?: number;
  size?: number;
  order?: string;
  sort?: "asc" | "desc";
  category?: string;
  subcategory?: string;
  language?: string;
}
