import "reflect-metadata";
import LanguageController from "@/contexts/CoreContext/presentation/http/controllers/LanguageController";

describe("LanguageController", () => {
  let controller: LanguageController;

  beforeEach(() => {
    controller = new LanguageController({} as any);
  });

  it("should have addLanguage method", () => {
    expect(controller.addLanguage).toBeDefined();
  });

  it("should have deleteLanguage method", () => {
    expect(controller.deleteLanguage).toBeDefined();
  });

  it("should have editLanguage method", () => {
    expect(controller.editLanguage).toBeDefined();
  });

  it("should have getLanguages method", () => {
    expect(controller.getLanguages).toBeDefined();
  });
});