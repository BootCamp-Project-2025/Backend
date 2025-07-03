import { Gender } from "@/contexts/CoreContext/domain/valueObjects/Gender";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { ValueObject } from "@/contexts/Shared/domain/ValueObject";

describe("Gender", () => {
  describe("create", () => {
    it("should create a Gender instance with a valid value", () => {
      const gender = Gender.create("male");
      expect(gender.value).toBe("male");
    });

    it("should throw ApiError if gender is empty", () => {
      expect(() => Gender.create("")).toThrow(ApiError);
      expect(() => Gender.create("")).toThrow("Gender is required");
    });

    it("should throw ApiError if gender is undefined", () => {
      expect(() => Gender.create(undefined as unknown as string)).toThrow(
        ApiError
      );
      expect(() => Gender.create(undefined as unknown as string)).toThrow(
        "Gender is required"
      );
    });

    it("should throw ApiError if gender is null", () => {
      expect(() => Gender.create(null as unknown as string)).toThrow(ApiError);
      expect(() => Gender.create(null as unknown as string)).toThrow(
        "Gender is required"
      );
    });

    it("should throw ApiError if gender is invalid", () => {
      expect(() => Gender.create("apache helicopter")).toThrow(ApiError);
      expect(() => Gender.create("apache helicopter")).toThrow(
        "Invalid Gender"
      );
    });
  });

  describe("structure", () => {
    it("should extend ValueObject", () => {
      const gender = Gender.create("female");
      expect(gender).toBeInstanceOf(ValueObject);
    });

    it("should expose the value getter correctly", () => {
      const gender = Gender.create("other");
      expect(gender.value).toBe("other");
    });
  });

  describe("case sensitivity", () => {
    it("should be case-sensitive and reject 'MALE'", () => {
      expect(() => Gender.create("MALE")).toThrow("Invalid Gender");
    });

    it("should allow only lowercase 'male', 'female', 'other'", () => {
      ["male", "female", "other"].forEach((valid) => {
        expect(() => Gender.create(valid)).not.toThrow();
      });
    });
  });
});
