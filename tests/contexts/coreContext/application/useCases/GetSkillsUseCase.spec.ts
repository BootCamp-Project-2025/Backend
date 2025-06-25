import "reflect-metadata";
import { Skill } from "@/contexts/CoreContext/domain/entities/Skill";
import GetSkillsUseCase from "@/contexts/CoreContext/application/useCases/GetSkillsUseCase";

jest.mock(
  "@/contexts/CoreContext/domain/interfaces/repositories/ISkillRepository"
);

describe("testing GetSkillsUseCase to obtain the skills of a freelancer", () => {
  it("exist", () => {
    expect(GetSkillsUseCase).toBeDefined();
  });
  const mockRepository = {
    getSkillsById: jest.fn(),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any;
  const getSkillsUseCase = new GetSkillsUseCase(mockRepository);
  it("successful skill delete", async () => {
    const skill: Skill = new Skill({
      name: "python",
      level: "beginner",
      freelancerId: "",
    });
    mockRepository.getSkillsById.mockResolvedValue([skill]);

    const result = await getSkillsUseCase.execute("freelancerId");
    expect(result).toEqual([skill]);
  });
});
