import { RequestCategory } from "@/contexts/CoreContext/domain/valueObjects/request/RequestCategory";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";

describe("RequestCategory", () => {
  it("should create a valid category", () => {
    const cat = RequestCategory.create("Science");
    expect(cat.value).toBe("Science");
  });

  it("should throw if category is empty", () => {
    expect(() => RequestCategory.create("")).toThrow(ApiError);
  });
});
