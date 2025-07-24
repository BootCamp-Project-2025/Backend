import { Request } from "../../aggregates/Request";

export default interface IRequestRepository {
  delete(requestId: string): Promise<void>;
  findById(requestId: string): Promise<Request | null>;
  create(request: Request): Promise<Request>;
  findAllActiveByUserId(userId: string, title: string): Promise<Request[]>;
}
