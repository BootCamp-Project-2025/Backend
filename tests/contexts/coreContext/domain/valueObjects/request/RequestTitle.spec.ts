import { RequestTitle } from "@/contexts/CoreContext/domain/valueObjects/request/RequestTitle";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";

describe("RequestTitle Value Object", () => {
  it("should create a valid RequestTitle", () => {
    const title = RequestTitle.create("Learn React");
    expect(title.value).toBe("Learn React");
  });

  it("should throw an error if the title is empty", () => {
    expect(() => RequestTitle.create("")).toThrow(ApiError);
  });

  it("should throw an error if the title is too long", () => {
    const longTitle = "a".repeat(101);
    expect(() => RequestTitle.create(longTitle)).toThrow(ApiError);
  });

  it("should create a default title", () => {
    const defaultTitle = RequestTitle.default();
    expect(defaultTitle.value).toBe("General Request");
  });
});
