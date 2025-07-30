import "reflect-metadata";
import RequestServicec from "@/contexts/CoreContext/application/services/RequestService";
import RequestMapper from "@/contexts/CoreContext/mappers/RequestMapper";
import { QueryParamsDto } from "@/contexts/CoreContext/domain/interfaces/dtos/search/QueryParamsDto";
import { PageDto } from "@/contexts/CoreContext/domain/interfaces/dtos/search/PageDto";
import { Request } from "@/contexts/CoreContext/domain/aggregates/Request";

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
  const searchRequestUseCase = { execute: mockFn };
  const service = new RequestServicec(
    deleteRequestUseCase,
    createRequestUseCase,
    getUserActiveRequestUseCase,
    searchRequestUseCase
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
    expect(service.getUserActiveRequest("testId", "testTitle")).resolves.toBe(
      returnArray
    );
    expect(mockFn).toHaveBeenCalled();
  });

  it("Call the searchRequest service", () => {
    const testQueryParams: QueryParamsDto = {
      page: 1,
      size: 10,
      category: "test-category",
      subcategory: "test-subcategory"
    };
    const testRequest = RequestMapper.dtoToDomain(basicRequest);
    const returnPage: PageDto<Request> = {
      data: [testRequest, testRequest],
      total: 2,
      page: 1,
      size: 10
    };
    mockFn.mockResolvedValue(returnPage);
    expect(service.searchRequest(testQueryParams)).resolves.toBe(returnPage);
    expect(mockFn).toHaveBeenCalledWith(testQueryParams);
  });
});

