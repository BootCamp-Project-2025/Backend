import "reflect-metadata";
import { Skill } from "@/contexts/CoreContext/domain/entities/Skill";
import EditSkillUseCase from "@/contexts/CoreContext/application/useCases/EditSkillUseCase";

jest.mock(
  "@/contexts/CoreContext/domain/interfaces/repositories/IFreelancerRepository"
);

describe("AddSkillUseCase", () => {
  it("exist", () => {
    expect(EditSkillUseCase).toBeDefined();
  });
  const mockRepository = {
    getSkillId: jest.fn(),
    editSkill: jest.fn(),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any;
  const editSkillUseCase = new EditSkillUseCase(mockRepository);
  it("successful skill edit", async () => {
    const skill: Skill = new Skill({ name: "python", level: "beginner" });
    mockRepository.getSkillId.mockResolvedValue("skillId");
    mockRepository.editSkill.mockResolvedValue(skill);

    const result = await editSkillUseCase.execute({
      skill: skill,
      freelancerId: "freelancerId",
    });
    expect(result).resolves;
  });
  it("fail to edit skill due to non existance", async () => {
    const skill: Skill = new Skill({ name: "python", level: "beginner" });
    mockRepository.getSkillId.mockResolvedValue(undefined);
    mockRepository.editSkill.mockResolvedValue(skill);

    expect(
      async () =>
        await editSkillUseCase.execute({
          skill: skill,
          freelancerId: "freelancerId",
        })
    ).rejects.toThrow("the skill doesnt exist");
  });
});
