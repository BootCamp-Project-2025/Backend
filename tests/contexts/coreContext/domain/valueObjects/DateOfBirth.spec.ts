import { DateOfBirth } from "@/contexts/CoreContext/domain/valueObjects/DateOfBirth";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { ValueObject } from "@/contexts/Shared/domain/ValueObject";

describe("DateOfBirth", () => {
  describe("create", () => {
    it("should create DateOfBirth with a valid date", () => {
      const date = new Date("2000-05-15");
      const dob = DateOfBirth.create(date);
      expect(dob.value).toEqual(date);
    });

    it("should throw ApiError if date is undefined", () => {
      expect(() => DateOfBirth.create(undefined as any)).toThrow(ApiError);
      expect(() => DateOfBirth.create(undefined as any)).toThrow(
        "Date of birth required"
      );
    });

    it("should throw ApiError if date is null", () => {
      expect(() => DateOfBirth.create(null as any)).toThrow(ApiError);
      expect(() => DateOfBirth.create(null as any)).toThrow(
        "Date of birth required"
      );
    });

    it("should throw ApiError if date is in the future", () => {
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + 1);
      expect(() => DateOfBirth.create(futureDate)).toThrow(ApiError);
      expect(() => DateOfBirth.create(futureDate)).toThrow(
        "Invalid date of birth"
      );
    });

    it("should throw ApiError if date is before 1990-01-01", () => {
      const oldDate = new Date("1880-10-10");
      expect(() => DateOfBirth.create(oldDate)).toThrow(ApiError);
      expect(() => DateOfBirth.create(oldDate)).toThrow(
        "Invalid date of birth"
      );
    });
  });

  describe("structure", () => {
    it("should extend ValueObject", () => {
      const date = new Date("1995-01-01");
      const dob = DateOfBirth.create(date);
      expect(dob).toBeInstanceOf(ValueObject);
    });

    it("should expose the value correctly", () => {
      const date = new Date("1999-09-09");
      const dob = DateOfBirth.create(date);
      expect(dob.value).toBeInstanceOf(Date);
      expect(dob.value.toISOString()).toBe(date.toISOString());
    });
  });
});
