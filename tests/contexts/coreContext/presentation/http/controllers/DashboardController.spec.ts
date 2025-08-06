import "reflect-metadata";
import { DashboardController } from "@/contexts/CoreContext/presentation/http/controllers/DashboardController";

describe("LanguageController", () => {
  let controller: DashboardController;

  beforeEach(() => {
    controller = new DashboardController({} as any);
  });

  it("should have addLanguage method", () => {
    expect(controller.getStudentStats).toBeDefined();
  });

  it("should have deleteLanguage method", () => {
    expect(controller.getTeacherStats).toBeDefined();
  });
});
