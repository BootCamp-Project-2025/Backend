import "reflect-metadata";
import LanguageService from "@/contexts/CoreContext/application/services/LanguageService";

describe("LanguageService", () => {
  let service: LanguageService;

  beforeEach(() => {
    service = new LanguageService(
      {} as any,
      {} as any,
      {} as any,
      {} as any 
    );
  });

  it("should have addLanguage method", () => {
    expect(service.addLanguage).toBeDefined();
  });

  it("should have removeLanguage method", () => {
    expect(service.removeLanguage).toBeDefined();
  });

  it("should have updateLanguage method", () => {
    expect(service.updateLanguage).toBeDefined();
  });

  it("should have getLanguages method", () => {
    expect(service.getLanguages).toBeDefined();
  });
});