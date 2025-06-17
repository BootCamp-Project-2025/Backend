import "reflect-metadata";
import { Skill } from "@/contexts/CoreContext/domain/valueObjects/Skill";
import GetSkillsUseCase from "@/contexts/CoreContext/application/useCases/GetSkillsUseCase";

jest.mock(
  "@/contexts/CoreContext/domain/interfaces/repositories/IFreelancerRepository"
);

describe("AddSkillUseCase", () => {
  it("exist", () => {
    expect(GetSkillsUseCase).toBeDefined();
  });
  const mockRepository = {
    getSkills: jest.fn(),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any;
  const getSkillsUseCase = new GetSkillsUseCase(mockRepository);
  it("successful skill delete", async () => {
    const skill: Skill = new Skill({ name: "python", level: "beginner" });
    mockRepository.getSkills.mockResolvedValue([skill]);

    const result = await getSkillsUseCase.execute("freelancerId");
    expect(result).toEqual([skill]);
  });
});
