import "reflect-metadata";
import CreateRequestUseCase from "@/contexts/CoreContext/application/useCases/requests/CreateRequestUseCase";
import IRequestRepository from "@/contexts/CoreContext/domain/interfaces/repositories/IRequestRepository";
import RequestMapper from "@/contexts/CoreContext/mappers/RequestMapper";
import { basicRequest } from "./RequestTestUtils";

describe("CreateRequestUseCase", () => {
  const mockCreate = jest.fn();
  const mockRequestRepository = {
    create: mockCreate,
  } as unknown as IRequestRepository;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const createRequestUseCase = new CreateRequestUseCase(mockRequestRepository);

  it("CreateRequestUseCase exists", () => {
    expect(createRequestUseCase).toBeDefined();
  });

  it("calls the create function correctly exists", () => {
    const testRequest = RequestMapper.dtoToDomain(basicRequest);
    const testCreatedRequest = RequestMapper.dtoToDomain(basicRequest);
    mockCreate.mockResolvedValue(testCreatedRequest);
    expect(createRequestUseCase.execute(testRequest)).resolves.toBe(
      testCreatedRequest
    );
    expect(mockCreate).toHaveBeenCalledWith(testRequest);
  });
});
