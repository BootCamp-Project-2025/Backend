import { Request } from "../../aggregates/Request";
import { PageDto } from "../dtos/search/PageDto";
import { QueryParamsDto } from "../dtos/search/QueryParamsDto";

export default interface IRequestService {
  delete(requestId: string): Promise<void>;
  create(request: Request): Promise<Request>;
  getUserActiveRequest(userId: string, title: string): Promise<Request[]>;
  searchRequest(queryParam: QueryParamsDto): Promise<PageDto<Request>>;
  getById(params: { requestId: string }): Promise<Request | null>;
  update(requestId: string, request: Request): Promise<Request>;
}
