import "reflect-metadata";
import FreelancerController from "@/contexts/CoreContext/presentation/http/controllers/FreelancerController";

jest.mock("@/contexts/CoreContext/application/services/FreelancerService");

describe("freelancer controller", () => {
  it("exist", () => {
    expect(FreelancerController).toBeDefined();
  });
});
