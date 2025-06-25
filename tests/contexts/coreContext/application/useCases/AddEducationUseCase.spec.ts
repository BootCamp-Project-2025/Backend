import "reflect-metadata";
import AddSkillUseCase from "@/contexts/CoreContext/application/useCases/AddSkillUseCase";

jest.mock(
  "@/contexts/CoreContext/domain/interfaces/repositories/IEducationRepository"
);

describe("Add Education Use Case", () => {
  it("Add education use case to be defined", () => {
    expect(AddSkillUseCase).toBeDefined();
  });
});
