import { Request } from "../../aggregates/Request";

export default interface IRequestService {
  delete(requestId: string): Promise<void>;
  create(request: Request): Promise<Request>;
  getUserActiveRequest(userId: string, title: string): Promise<Request[]>;
}
