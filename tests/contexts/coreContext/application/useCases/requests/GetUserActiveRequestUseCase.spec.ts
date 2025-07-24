import "reflect-metadata";
import GetUserActiveRequestUseCase from "@/contexts/CoreContext/application/useCases/requests/GetUserActiveRequestUseCase";
import IRequestRepository from "@/contexts/CoreContext/domain/interfaces/repositories/IRequestRepository";
import RequestMapper from "@/contexts/CoreContext/mappers/RequestMapper";
import { basicRequest } from "./RequestTestUtils";

describe("GetUserActiveRequestUseCase", () => {
  const mockFindAllActiveByUserId = jest.fn();
  const mockRequestRepository: IRequestRepository = {
    findAllActiveByUserId: mockFindAllActiveByUserId,
  } as unknown as IRequestRepository;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const getUserActiveRequestUseCase = new GetUserActiveRequestUseCase(
    mockRequestRepository
  );

  it("GetUserActiveRequestUseCase exists", () => {
    expect(getUserActiveRequestUseCase).toBeDefined();
  });

  it("get all the existing request with the userId", () => {
    const request1 = RequestMapper.dtoToDomain(basicRequest);
    const request2 = RequestMapper.dtoToDomain(basicRequest);
    const requestList = [request1, request2];
    mockFindAllActiveByUserId.mockResolvedValue(requestList);
    expect(
      getUserActiveRequestUseCase.execute({
        userId: "testId",
        title: "testTitle",
      })
    ).resolves.toBe(requestList);
    expect(mockFindAllActiveByUserId).toHaveBeenCalledWith(
      "testId",
      "testTitle"
    );
  });
});
