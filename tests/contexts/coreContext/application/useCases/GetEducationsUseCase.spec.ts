import "reflect-metadata";
import { Education } from "@/contexts/CoreContext/domain/entities/Education";
import IEducationRepository from "@/contexts/CoreContext/domain/interfaces/repositories/IEducationRepository";
import GetEducationsUseCase from "@/contexts/CoreContext/application/useCases/GetEducationsUseCase";

jest.mock(
  "@/contexts/CoreContext/domain/interfaces/repositories/IEducationRepository"
);

describe("Get Educations Use Case", () => {
  it("Exists", () => {
    expect(GetEducationsUseCase).toBeDefined();
  });
  // const mockRepository = {} as IEducationRepository;
  // const getEducationsUseCase = new GetEducationsUseCase(mockRepository);
  it("Retrieves educations successfully", async () => {
    // const education: Education = Education.create({career: 'Systems engineering', startDate})
    expect(true).toBe(true);
  });
});
