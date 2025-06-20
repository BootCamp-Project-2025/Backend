import LanguageService from "@/contexts/CoreContext/application/services/LanguageService";

describe("freelancer service", () => {
  it("exist", () => {
    expect(LanguageService).toBeDefined();
  });
  it("has addLanguage method", () => {
    expect(LanguageService.prototype.addLanguage).toBeDefined();
  });
  it("has removeLanguage method", () => {
    expect(LanguageService.prototype.removeLanguage).toBeDefined();
  });
  it("has updateLanguage method", () => {
    expect(LanguageService.prototype.updateLanguage).toBeDefined();
  });
  it("has getLanguages method", () => {
    expect(LanguageService.prototype.getLanguages).toBeDefined();
  });
});
