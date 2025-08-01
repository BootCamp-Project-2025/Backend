import { Request } from "../../aggregates/Request";

export default interface IRequestService {
  delete(requestId: string): Promise<void>;
  create(request: Request): Promise<Request>;
  getUserActiveRequest(userId: string, title: string): Promise<Request[]>;
  getById(params: { requestId: string }): Promise<Request | null>;
  update(requestId: string, request: Request): Promise<Request>;
}
