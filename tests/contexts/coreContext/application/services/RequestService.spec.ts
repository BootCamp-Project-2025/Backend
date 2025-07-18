import "reflect-metadata";
import RequestServicec from "@/contexts/CoreContext/application/services/RequestService";
import RequestMapper from "@/contexts/CoreContext/mappers/RequestMapper";

const basicRequest = {
  id: "string",
  title: "string",
  description: "string",
  language: "string",
  category: "string",
  subcategory: "string",
  status: "AVAILABLE",
  userId: "string",
  estimation: 200,
  edited: false,
  createdAt: new Date(),
  updatedAt: new Date(),
  proposals: [],
};

describe("RequestService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  const mockFn = jest.fn();
  const deleteRequestUseCase = { execute: mockFn };
  const createRequestUseCase = { execute: mockFn };
  const getUserActiveRequestUseCase = { execute: mockFn };
  const service = new RequestServicec(
    deleteRequestUseCase,
    createRequestUseCase,
    getUserActiveRequestUseCase
  );
  it("exists", () => {
    expect(service.create).toBeDefined();
    expect(service.delete).toBeDefined();
    expect(service.getUserActiveRequest).toBeDefined();
  });
  it("Call the create service", () => {
    const testRequest = RequestMapper.dtoToDomain(basicRequest);
    mockFn.mockResolvedValue(testRequest);
    expect(service.create(testRequest)).resolves.toBe(testRequest);
    expect(mockFn).toHaveBeenCalledWith(testRequest);
  });
  it("Call the delete service", async () => {
    mockFn.mockResolvedValue(undefined);
    await service.delete("testId");
    expect(mockFn).toHaveBeenCalledWith("testId");
  });
  it("Call the getUserActiveRequestUseCase service", () => {
    const testRequest = RequestMapper.dtoToDomain(basicRequest);
    const returnArray = [testRequest, testRequest];
    mockFn.mockResolvedValue(returnArray);
    expect(service.getUserActiveRequest("testId")).resolves.toBe(returnArray);
    expect(mockFn).toHaveBeenCalled();
  });
});
