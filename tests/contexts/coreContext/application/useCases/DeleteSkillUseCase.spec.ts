import "reflect-metadata";
import { Skill } from "@/contexts/CoreContext/domain/entities/Skill";
import DeleteSkillUseCase from "@/contexts/CoreContext/application/useCases/DeleteSkillUseCase";
import { Freelancer } from "@/contexts/CoreContext/domain/aggregates/Freelancer";
import { UniqueEntityID } from "@/contexts/Shared/domain/UniqueEntityID";
import { UserId } from "@/contexts/CoreContext/domain/valueObjects/UserId";
import { About } from "@/contexts/CoreContext/domain/valueObjects/About";
import { Skills } from "@/contexts/CoreContext/domain/OneToMany/Skills";
import { Languages } from "@/contexts/CoreContext/domain/OneToMany/Languages";
import { Educations } from "@/contexts/CoreContext/domain/OneToMany/Educations";
import { Experiences } from "@/contexts/CoreContext/domain/OneToMany/Experiences";
import { Certifications } from "@/contexts/CoreContext/domain/OneToMany/Certifications";

jest.mock(
  "@/contexts/CoreContext/domain/interfaces/repositories/IFreelancerRepository"
);

jest.mock(
  "@/contexts/CoreContext/domain/interfaces/repositories/ISkillRepository"
);

describe("testing DeleteSkillUseCase to delete skills from freelancer", () => {
  it("exist", () => {
    expect(DeleteSkillUseCase).toBeDefined();
  });
  const mockRepository = {
    save: jest.fn(),
    delete: jest.fn(),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any;

  const mockFreelancerRepository = {
    getById: jest.fn(),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any;
  const empyFreelancer: Freelancer = Freelancer.create({
    userId: UserId.create(new UniqueEntityID()),
    about: About.create(""),
    skills: Skills.create([]),
    languages: Languages.create([]),
    education: Educations.create([]),
    experience: Experiences.create([]),
    certifications: Certifications.create([]),
  });
  const deleteSkillUseCase = new DeleteSkillUseCase(
    mockFreelancerRepository,
    mockRepository
  );
  it("successful skill delete", async () => {
    const skill = new Skill({
      name: "python",
      level: "beginner",
      freelancerId: "",
    }, new UniqueEntityID("skillId")); 
    mockRepository.delete.mockResolvedValue();
    empyFreelancer.skills.add(skill);
    mockFreelancerRepository.getById.mockResolvedValue(empyFreelancer);

    const result = await deleteSkillUseCase.execute({skillId: "skillId", freelancerId: "freelanceId"});
    expect(result).resolves;
  });
  it("fail to delete skill due to non existance", async () => {
    mockFreelancerRepository.getById.mockResolvedValue(empyFreelancer);

    await expect(
      deleteSkillUseCase.execute({ skillId: "skillId", freelancerId: "freelanceId" })
    ).rejects.toThrow("the skill doesnt exist");
  });
});
