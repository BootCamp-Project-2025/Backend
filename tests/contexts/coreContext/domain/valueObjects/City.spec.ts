import { City } from "@/contexts/CoreContext/domain/valueObjects/City";

describe('City', () => {
  it('should create a City with a valid value', () => {
    const city = City.create('Madrid');
    expect(city.value).toBe('Madrid');
  });

  it('should throw an ApiError if value is empty', () => {
    expect(() => City.create('')).toThrow('City is required');
  });

  it('should throw an ApiError if value is undefined', () => {
    expect(() => City.create(undefined as any)).toThrow('City is required');
  });

  it('should throw an ApiError if value is null', () => {
    expect(() => City.create(null as any)).toThrow('City is required');
  });
});
