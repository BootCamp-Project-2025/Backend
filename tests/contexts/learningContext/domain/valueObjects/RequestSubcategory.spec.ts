import { RequestSubcategory } from "@/contexts/LearningContext/domain/valueObjects/RequestSubCategory";
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
