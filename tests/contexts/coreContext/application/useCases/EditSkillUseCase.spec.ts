import "reflect-metadata";
import { Skill } from "@/contexts/CoreContext/domain/entities/Skill";
import EditSkillUseCase from "@/contexts/CoreContext/application/useCases/EditSkillUseCase";
import { ISkillRepository } from "@/contexts/CoreContext/domain/interfaces/repositories/ISkillRepository";
import { Freelancer } from "@/contexts/CoreContext/domain/aggregates/Freelancer";
import { UserId } from "@/contexts/CoreContext/domain/valueObjects/UserId";
import { UniqueEntityID } from "@/contexts/Shared/domain/UniqueEntityID";
import { About } from "@/contexts/CoreContext/domain/valueObjects/About";
import { Certifications } from "@/contexts/CoreContext/domain/OneToMany/Certifications";
import { Skills } from "@/contexts/CoreContext/domain/OneToMany/Skills";
import { Languages } from "@/contexts/CoreContext/domain/OneToMany/Languages";
import { Educations } from "@/contexts/CoreContext/domain/OneToMany/Educations";
import { Experiences } from "@/contexts/CoreContext/domain/OneToMany/Experiences";

jest.mock(
  "@/contexts/CoreContext/domain/interfaces/repositories/IFreelancerRepository"
);

jest.mock(
  "@/contexts/CoreContext/domain/interfaces/repositories/ISkillRepository"
);

describe("EditSkillUseCase", () => {
  it("exist", () => {
    expect(EditSkillUseCase).toBeDefined();
  });
  const mockRepository = {
    save: jest.fn(),
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

  const editSkillUseCase = new EditSkillUseCase(
    mockFreelancerRepository,
    mockRepository
  );
  it("successful skill edit", async () => {
    const skill: Skill = new Skill({
      name: "python",
      level: "beginner",
      freelancerId: "",
    });
    mockRepository.save.mockResolvedValue();
    mockFreelancerRepository.getById.mockResolvedValue(empyFreelancer);

    expect(async () => await editSkillUseCase.execute(skill)).resolves;
  });
  it("fail to edit skill due to non existance", async () => {
    const skill: Skill = new Skill({
      name: "python",
      level: "beginner",
      freelancerId: "",
    });
    mockRepository.save.mockResolvedValue();
    mockFreelancerRepository.getById.mockResolvedValue(empyFreelancer);

    expect(async () => await editSkillUseCase.execute(skill)).rejects.toThrow(
      "the skill doesnt exist"
    );
  });
});
