import { RequestSubcategory } from "@/contexts/CoreContext/domain/valueObjects/request/RequestSubCategory";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";

describe("RequestSubcategory", () => {
  it("should create a valid subcategory", () => {
    const sub = RequestSubcategory.create("Math");
    expect(sub.value).toBe("Math");
  });

  it("should throw if subcategory is empty", () => {
    expect(() => RequestSubcategory.create("")).toThrow(ApiError);
  });
});
