import { RequestLanguage } from "@/contexts/LearningContext/domain/valueObjects/RequestLanguage";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";

describe("RequestLanguage", () => {
  it("should accept 'EN' or 'ES'", () => {
    expect(RequestLanguage.create("en").value).toBe("EN");
    expect(RequestLanguage.create("ES").value).toBe("ES");
  });

  it("should throw if language is not supported", () => {
    expect(() => RequestLanguage.create("FR")).toThrow(ApiError);
  });
});
