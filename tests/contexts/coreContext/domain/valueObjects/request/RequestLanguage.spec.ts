import { RequestLanguage } from "@/contexts/CoreContext/domain/valueObjects/request/RequestLanguage";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";

describe("RequestLanguage", () => {
  it("should accept input or uppercase", () => {
    expect(RequestLanguage.create("en").value).toBe("EN");
    expect(RequestLanguage.create("ES").value).toBe("ES");
  });

  /*it("should throw if language is not supported", () => {
    expect(() => RequestLanguage.create("FR")).toThrow(ApiError);
  });*/
});
