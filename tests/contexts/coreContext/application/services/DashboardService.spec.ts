import "reflect-metadata";
import { DashboardService } from "@/contexts/CoreContext/application/services/DashboardService";

describe("DashboardService", () => {
  let service: DashboardService;

  beforeEach(() => {
    service = new DashboardService({} as any);
  });

  it("should have getDashboardStats method", () => {
    expect(service.getDashboardStats).toBeDefined();
  });
});
