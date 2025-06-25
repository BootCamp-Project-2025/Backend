import "reflect-metadata";
import EducationService from "@/contexts/CoreContext/application/services/EducationService";

describe("Freelancer Education service", () => {
  it("Exists", () => {
    expect(EducationService).toBeDefined();
  });

  it("Has addEducation method", () => {
    expect(EducationService.prototype.addEducation).toBeDefined();
  });

  it("Has removeById method", () => {
    expect(EducationService.prototype.removeById).toBeDefined();
  });

  it("Has getAll method", () => {
    expect(EducationService.prototype.getAllOfFreelancer).toBeDefined();
  });
});
