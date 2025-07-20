import { Request } from "../../aggregates/Request";

export default interface IRequestRepository {
  delete(requestId: string): void;
  findById(requestId: string): Request | null;
  create(request: Request): Request;
  findAllActiveByUserId(userId: string): Request[];
}
