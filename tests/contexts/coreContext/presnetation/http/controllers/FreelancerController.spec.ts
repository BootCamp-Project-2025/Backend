import FreelancerController from "@/contexts/CoreContext/presentation/http/controllers/FreelancerController";

describe("freelancer controller", () => {
  it("exist", () => {
    expect(FreelancerController).toBeDefined();
  });

  it("has addskill method", () => {
    expect(FreelancerController.prototype.addSkill).toBeDefined();
  });
  it("has deleteSkill method", () => {
    expect(FreelancerController.prototype.deleteSkill).toBeDefined();
  });
  it("has editSkill method", () => {
    expect(FreelancerController.prototype.editSkill).toBeDefined();
  });
  it("has getSkills method", () => {
    expect(FreelancerController.prototype.getSkills).toBeDefined();
  });
});
