import "reflect-metadata";
import { Skill } from "@/contexts/CoreContext/domain/entities/Skill";
import DeleteSkillUseCase from "@/contexts/CoreContext/application/useCases/DeleteSkillUseCase";

jest.mock(
  "@/contexts/CoreContext/domain/interfaces/repositories/IFreelancerRepository"
);

describe("AddSkillUseCase", () => {
  it("exist", () => {
    expect(DeleteSkillUseCase).toBeDefined();
  });
  const mockRepository = {
    getSkillId: jest.fn(),
    deleteSkill: jest.fn(),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any;
  const deleteSkillUseCase = new DeleteSkillUseCase(mockRepository);
  it("successful skill delete", async () => {
    const skill: Skill = new Skill({ name: "python", level: "beginner" });
    mockRepository.getSkillId.mockResolvedValue("skillId");
    mockRepository.deleteSkill.mockResolvedValue(skill);

    const result = await deleteSkillUseCase.execute({
      skill: skill,
      freelancerId: "freelancerId",
    });
    expect(result).resolves;
  });
  it("fail to delete skill due to non existance", async () => {
    const skill: Skill = new Skill({ name: "python", level: "beginner" });
    mockRepository.getSkillId.mockResolvedValue(undefined);
    mockRepository.deleteSkill.mockResolvedValue(skill);

    expect(
      async () =>
        await deleteSkillUseCase.execute({
          skill: skill,
          freelancerId: "freelancerId",
        })
    ).rejects.toThrow("the skill doesnt exist");
  });
});
