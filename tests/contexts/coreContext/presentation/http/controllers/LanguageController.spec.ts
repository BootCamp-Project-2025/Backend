import LanguageController from "@/contexts/CoreContext/presentation/http/controllers/LanguageController";

describe("freelancer controller", () => {
  it("exist", () => {
    expect(LanguageController).toBeDefined();
  });

  it("has addLanguage method", () => {
    expect(LanguageController.prototype.addLanguage).toBeDefined();
  });
  it("has removeLanguage method", () => {
    expect(LanguageController.prototype.deleteLanguage).toBeDefined();
  });
  it("has updateLanguages method", () => {
    expect(LanguageController.prototype.editLanguage).toBeDefined();
  });
  it("has getLanguages method", () => {
    expect(LanguageController.prototype.getLanguages).toBeDefined();
  });
});
