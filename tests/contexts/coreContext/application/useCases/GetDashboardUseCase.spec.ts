import "reflect-metadata";
import { GetDashboardUseCase } from "@/contexts/CoreContext/application/useCases/GetDashboardUseCase";
import { StatusCodes } from "http-status-codes";

describe("GetDashboardUseCase", () => {
  let useCase: GetDashboardUseCase;
  const mockRepository = {
    getStats: jest.fn(),
  };

  beforeEach(() => {
    useCase = new GetDashboardUseCase(mockRepository as any);
    jest.clearAllMocks();
  });

  it("throws ApiError when stats is null", async () => {
    mockRepository.getStats.mockResolvedValue(null);

    await expect(useCase.execute("userId", "CLIENT")).rejects.toMatchObject({
      statusCode: StatusCodes.NOT_FOUND,
      message: "stats not found",
    });

    expect(mockRepository.getStats).toHaveBeenCalledWith("userId", "CLIENT");
  });

  it("returns stats when found", async () => {
    const dummyStats = { courses: [], p2pCourses: [], proposals: [] };
    mockRepository.getStats.mockResolvedValue(dummyStats);

    const result = await useCase.execute("userId", "CLIENT");

    expect(result).toEqual(dummyStats);
    expect(mockRepository.getStats).toHaveBeenCalledWith("userId", "CLIENT");
  });
});
