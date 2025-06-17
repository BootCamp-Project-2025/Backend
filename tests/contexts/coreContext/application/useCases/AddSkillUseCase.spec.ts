import "reflect-metadata";
import AddSkillUseCase from "@/contexts/CoreContext/application/useCases/AddSkillUseCase";
import { Skill } from "@/contexts/CoreContext/domain/valueObjects/Skill";

jest.mock(
  "@/contexts/CoreContext/domain/interfaces/repositories/IFreelancerRepository"
);

describe("AddSkillUseCase", () => {
  it("exist", () => {
    expect(AddSkillUseCase).toBeDefined();
  });
  const mockRepository = {
    getSkills: jest.fn(),
    updateSkills: jest.fn(),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any;
  const addSkillUseCase = new AddSkillUseCase(mockRepository);
  it("successful skill added", async () => {
    const skill: Skill = new Skill({ name: "python", level: "beginner" });
    const skills: Skill[] = [];
    mockRepository.getSkills.mockResolvedValue(skills);
    mockRepository.updateSkills.mockResolvedValue(skill);

    const result = await addSkillUseCase.execute({
      skill: skill,
      freelancerId: "freelancerId",
    });
    expect(result).toEqual(skill);
  });
  it("fail to add skill due to lenght", async () => {
    const skill: Skill = new Skill({ name: "python", level: "beginner" });
    const skills: Skill[] = Array.from(
      { length: 10 },
      (v, i) => new Skill({ name: "python" + i, level: "beginner" })
    );
    mockRepository.getSkills.mockResolvedValue(skills);
    mockRepository.updateSkills.mockResolvedValue(skill);

    expect(
      async () =>
        await addSkillUseCase.execute({
          skill: skill,
          freelancerId: "freelancerId",
        })
    ).rejects.toThrow("max limit");
  });
  it("fail to add skill due to reapeated", async () => {
    const skill: Skill = new Skill({ name: "python", level: "beginner" });
    const skills: Skill[] = [new Skill({ name: "python", level: "beginner" })];
    mockRepository.getSkills.mockResolvedValue(skills);
    mockRepository.updateSkills.mockResolvedValue(skill);

    expect(
      async () =>
        await addSkillUseCase.execute({
          skill: skill,
          freelancerId: "freelancerId",
        })
    ).rejects.toThrow("skill repeated");
  });
});
