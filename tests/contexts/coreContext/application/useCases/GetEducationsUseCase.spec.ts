import "reflect-metadata";
import GetEducationsUseCase from "@/contexts/CoreContext/application/useCases/GetEducationsUseCase";

jest.mock(
  "@/contexts/CoreContext/domain/interfaces/repositories/IEducationRepository"
);

describe("Get Education Use Case", () => {
  it("Get education use case to be defined", () => {
    expect(GetEducationsUseCase).toBeDefined();
  });
});
