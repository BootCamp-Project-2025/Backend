import "reflect-metadata";
import SkillService from "@/contexts/CoreContext/application/services/SkillService";

describe("freelancer service", () => {
  it("exist", () => {
    expect(SkillService).toBeDefined();
  });
  it("has addskill method", () => {
    expect(SkillService.prototype.addSkill).toBeDefined();
  });
  it("has deleteSkill method", () => {
    expect(SkillService.prototype.deleteSkill).toBeDefined();
  });
  it("has editSkill method", () => {
    expect(SkillService.prototype.editSkill).toBeDefined();
  });
  it("has getSkills method", () => {
    expect(SkillService.prototype.getSkills).toBeDefined();
  });
});
