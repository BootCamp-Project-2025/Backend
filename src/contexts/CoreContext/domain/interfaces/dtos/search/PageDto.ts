export interface PageDto<T> {
  data: T[];
  page: number;
  size: number;
  total: number;
}
