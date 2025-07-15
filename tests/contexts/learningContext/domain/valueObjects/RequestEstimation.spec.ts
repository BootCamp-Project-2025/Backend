import { RequestEstimation } from "@/contexts/LearningContext/domain/valueObjects/RequestEstimation";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";

describe("RequestEstimation", () => {
  it("should create a valid estimation", () => {
    const estimation = RequestEstimation.create(10);
    expect(estimation.value).toBe(10);
  });

  it("should throw if estimation is zero or less", () => {
    expect(() => RequestEstimation.create(0)).toThrow(ApiError);
  });

  it("should throw if estimation exceeds 365", () => {
    expect(() => RequestEstimation.create(366)).toThrow(ApiError);
  });
});
