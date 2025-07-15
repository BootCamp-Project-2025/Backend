import { RequestDescription } from "@/contexts/LearningContext/domain/valueObjects/RequestDescription";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";

describe("RequestDescription", () => {
  it("should create a valid description", () => {
    const description = RequestDescription.create("A valid description");
    expect(description.value).toBe("A valid description");
  });

  it("should throw if description is empty", () => {
    expect(() => RequestDescription.create("")).toThrow(ApiError);
  });

  it("should throw if description is too long", () => {
    const longText = "a".repeat(301);
    expect(() => RequestDescription.create(longText)).toThrow(ApiError);
  });

  it("should return default description", () => {
    const defaultDesc = RequestDescription.default();
    expect(defaultDesc.value).toBe("General description");
  });
});
