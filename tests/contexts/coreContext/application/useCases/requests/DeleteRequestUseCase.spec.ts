import "reflect-metadata";
import DeleteRequestUseCase from "@/contexts/CoreContext/application/useCases/requests/DeleteRequestUseCase";
import IRequestRepository from "@/contexts/CoreContext/domain/interfaces/repositories/IRequestRepository";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import RequestMapper from "@/contexts/CoreContext/mappers/RequestMapper";

describe("DeleteRequestUseCase", () => {
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

  const mockDelete = jest.fn();
  const mockFindById = jest.fn();
  const mockRequestRepository = {
    delete: mockDelete,
    findById: mockFindById,
  } as unknown as IRequestRepository;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const deleteRequestUseCase = new DeleteRequestUseCase(mockRequestRepository);

  it("DeleteRequestUseCase exists", () => {
    expect(deleteRequestUseCase).toBeDefined();
  });

  it("deletes correctly", async () => {
    const testRequest = RequestMapper.dtoToDomain(basicRequest);
    mockFindById.mockResolvedValue(testRequest);
    mockDelete.mockResolvedValue(null);
    expect(await deleteRequestUseCase.execute("testId")).toBeUndefined();
    expect(mockFindById).toHaveBeenCalled();
    expect(mockDelete).toHaveBeenCalled();
  });

  it("throws error if the request doesnt exist", () => {
    mockFindById.mockResolvedValue(null);
    expect(deleteRequestUseCase.execute("testId")).rejects.toThrow(ApiError);
    expect(mockFindById).toHaveBeenCalled();
  });
});
