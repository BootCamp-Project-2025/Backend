import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { ValueObject } from "@/contexts/Shared/domain/ValueObject";
import { LanguagePreference } from "@/contexts/CoreContext/domain/valueObjects/LanguagePreference";

describe("LanguagePreference", () => {
  describe("create", () => {
    it("should create a valid language preference object", () => {
      const lang = LanguagePreference.create("English");
      expect(lang.value).toBe("English");
    });

    it("should be case insensitive", () => {
      const lang = LanguagePreference.create("spanish");
      expect(lang.value).toBe("spanish");
    });

    it("should throw if language is null", () => {
      expect(() => LanguagePreference.create(null as any)).toThrow(ApiError);
      expect(() => LanguagePreference.create(null as any)).toThrow("LanguagePreference is required");
    });

    it("should throw if language is undefined", () => {
      expect(() => LanguagePreference.create(undefined as any)).toThrow(ApiError);
      expect(() => LanguagePreference.create(undefined as any)).toThrow("LanguagePreference is required");
    });

    it("should throw if language is empty", () => {
      expect(() => LanguagePreference.create("")).toThrow(ApiError);
      expect(() => LanguagePreference.create("")).toThrow("LanguagePreference is required");
    });

    it("should throw if language is not valid", () => {
      expect(() => LanguagePreference.create("Klingon")).toThrow(ApiError);
      expect(() => LanguagePreference.create("Klingon")).toThrow("Invalid LanguagePreference");
    });
  });

  describe("structure", () => {
    it("should extend ValueObject", () => {
      const lang = LanguagePreference.create("French");
      expect(lang).toBeInstanceOf(ValueObject);
    });

    it("should expose the value getter", () => {
      const lang = LanguagePreference.create("German");
      expect(lang.value).toBe("German");
    });
  });
});
