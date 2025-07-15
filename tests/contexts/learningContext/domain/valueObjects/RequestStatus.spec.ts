import {
  RequestStatus,
  RequestStatusEnum,
} from "@/contexts/LearningContext/domain/valueObjects/RequestStatus";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";

describe("RequestStatus Value Object", () => {
  it("should create a valid status", () => {
    const status = RequestStatus.create("PENDING");
    expect(status.value).toBe(RequestStatusEnum.PENDING);
    expect(status.isPending()).toBe(true);
  });

  it("should throw an error for invalid status", () => {
    expect(() => RequestStatus.create("INVALID")).toThrow(ApiError);
  });

  it("should correctly detect status types", () => {
    const available = RequestStatus.create("AVAILABLE");
    expect(available.isAvalilable()).toBe(true);
    expect(available.isPending()).toBe(false);
  });

  it("should create a default status", () => {
    const defaultStatus = RequestStatus.default();
    expect(defaultStatus.value).toBe(RequestStatusEnum.PENDING);
  });
});
