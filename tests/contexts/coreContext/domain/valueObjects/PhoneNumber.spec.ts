import { PhoneNumber } from "@/contexts/CoreContext/domain/valueObjects/PhoneNumber";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { ValueObject } from "@/contexts/Shared/domain/ValueObject";

describe("PhoneNumber", () => {
  describe("create", () => {
    it("should create a valid phone number object", () => {
      const phone = PhoneNumber.create("(123) 456-7890");
      expect(phone.value).toBe("(123) 456-7890");
    });

    it("should accept other valid formats", () => {
      expect(() => PhoneNumber.create("123-456-7890")).not.toThrow();
      expect(() => PhoneNumber.create("123.456.7890")).not.toThrow();
      expect(() => PhoneNumber.create("123 456 7890")).not.toThrow();
      expect(() => PhoneNumber.create("+1 123-456-7890")).not.toThrow();
    });

    it("should throw if phone is null", () => {
      expect(() => PhoneNumber.create(null as unknown as string)).toThrow(
        ApiError
      );
      expect(() => PhoneNumber.create(null as unknown as string)).toThrow(
        "Phone is Required"
      );
    });

    it("should throw if phone is undefined", () => {
      expect(() => PhoneNumber.create(undefined as unknown as string)).toThrow(
        ApiError
      );
      expect(() => PhoneNumber.create(undefined as unknown as string)).toThrow(
        "Phone is Required"
      );
    });

    it("should throw if phone is an empty string", () => {
      expect(() => PhoneNumber.create("")).toThrow(ApiError);
      expect(() => PhoneNumber.create("")).toThrow("Phone is Required");
    });

    it("should throw if phone is in an invalid format", () => {
      expect(() => PhoneNumber.create("abc-def-ghij")).toThrow(
        "Phone is not valid"
      );
    });
  });

  describe("structure", () => {
    it("should extend ValueObject", () => {
      const phone = PhoneNumber.create("123-456-7890");
      expect(phone).toBeInstanceOf(ValueObject);
    });

    it("should expose the value getter correctly", () => {
      const phone = PhoneNumber.create("123.456.7890");
      expect(phone.value).toBe("123.456.7890");
    });
  });
});
