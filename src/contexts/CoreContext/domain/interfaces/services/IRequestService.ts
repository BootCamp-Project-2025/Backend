import { Request } from "../../aggregates/Request";

export default interface IRequestService {
  delete(requestId: string): Promise<void>;
  create(request: Request): Promise<Request>;
  getUserActiveRequest(clientId: string): Promise<Request[]>;
}
