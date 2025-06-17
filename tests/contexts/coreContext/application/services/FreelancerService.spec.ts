import "reflect-metadata";
import FreelancerService from "@/contexts/CoreContext/application/services/FreelancerService";

describe("freelancer service", () => {
  it("exist", () => {
    expect(FreelancerService).toBeDefined();
  });
  it("has addskill method", () => {
    expect(FreelancerService.prototype.addSkill).toBeDefined();
  });
  it("has deleteSkill method", () => {
    expect(FreelancerService.prototype.deleteSkill).toBeDefined();
  });
  it("has editSkill method", () => {
    expect(FreelancerService.prototype.editSkill).toBeDefined();
  });
  it("has getSkills method", () => {
    expect(FreelancerService.prototype.getSkills).toBeDefined();
  });
});
