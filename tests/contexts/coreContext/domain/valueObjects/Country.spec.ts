import { Country } from "@/contexts/CoreContext/domain/valueObjects/Country";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { ValueObject } from "@/contexts/Shared/domain/ValueObject";

describe("Country", () => {
  describe("create", () => {
    it("should create a Country with a valid name", () => {
      const country = Country.create("Bolivia");
      expect(country.value).toBe("Bolivia");
    });

    it("should throw ApiError if value is an empty string", () => {
      expect(() => Country.create("")).toThrowError(ApiError);
      expect(() => Country.create("")).toThrow("Country is required");
    });

    it("should throw ApiError if value is undefined", () => {
      expect(() => Country.create(undefined as any)).toThrow(ApiError);
      expect(() => Country.create(undefined as any)).toThrow(
        "Country is required"
      );
    });

    it("should throw ApiError if value is null", () => {
      expect(() => Country.create(null as any)).toThrow(ApiError);
      expect(() => Country.create(null as any)).toThrow("Country is required");
    });

    it("should throw ApiError if value is an invalid country", () => {
      expect(() => Country.create("Narnia")).toThrowError(ApiError);
      expect(() => Country.create("Narnia")).toThrow("Invalid Country");
    });
  });

  describe("structure", () => {
    it("should extend ValueObject", () => {
      const country = Country.create("Canada");
      expect(country).toBeInstanceOf(ValueObject);
    });

    it("should expose the value getter correctly", () => {
      const country = Country.create("Germany");
      expect(country.value).toBe("Germany");
    });
  });

  describe("case-insensitivity", () => {
    it("should accept countries regardless of case", () => {
      expect(() => Country.create("united states")).not.toThrow();
      expect(() => Country.create("UNITED STATES")).not.toThrow();
    });
  });
});
