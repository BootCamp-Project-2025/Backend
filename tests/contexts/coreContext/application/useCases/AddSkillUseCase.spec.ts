import "reflect-metadata";
import AddSkillUseCase from "@/contexts/CoreContext/application/useCases/AddSkillUseCase";
import { Skill } from "@/contexts/CoreContext/domain/entities/Skill";
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

describe("testing AddSkillUseCase component to add skills to freelancer", () => {
  it("exist", () => {
    expect(AddSkillUseCase).toBeDefined();
  });
  const mockRepository = {
    create: jest.fn(),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any;
  const mockFreelanceRepository = {
    getById: jest.fn(),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any;
  const addSkillUseCase = new AddSkillUseCase(
    mockFreelanceRepository,
    mockRepository
  );
  it("successful skill added", async () => {
    const skill: Skill = new Skill({
      name: "python",
      level: "beginner",
      freelancerId: "",
    });
    const skills: Skill[] = [];
    const emptyFreelancer: Freelancer = Freelancer.create({
      userId: UserId.create(new UniqueEntityID()),
      about: About.update(
        "Lorem ipsum dolor sit amet, consectetur adipiscing."
      ),
      skills: Skills.create(skills),
      languages: Languages.create([]),
      education: Educations.create([]),
      experience: Experiences.create([]),
      certifications: Certifications.create([]),
    });

    mockRepository.create.mockResolvedValue(skill);
    mockFreelanceRepository.getById.mockResolvedValue(emptyFreelancer);

    const result = await addSkillUseCase.execute(skill);
    expect(result).resolves;
  });
  it("fail to add skill due to lenght", async () => {
    const skill: Skill = new Skill({
      name: "python",
      level: "beginner",
      freelancerId: "",
    });
    const skills: Skill[] = Array.from(
      { length: 10 },
      (v, i) =>
        new Skill({ name: "python" + i, level: "beginner", freelancerId: "" })
    );
    const emptyFreelancer: Freelancer = Freelancer.create({
      userId: UserId.create(new UniqueEntityID()),
      about: About.update(
        "Lorem ipsum dolor sit amet, consectetur adipiscing."
      ),
      skills: Skills.create(skills),
      languages: Languages.create([]),
      education: Educations.create([]),
      experience: Experiences.create([]),
      certifications: Certifications.create([]),
    });

    mockRepository.create.mockResolvedValue(skill);
    mockFreelanceRepository.getById.mockResolvedValue(emptyFreelancer);

    expect(async () => await addSkillUseCase.execute(skill)).rejects.toThrow(
      "You can't add more than 10 skills."
    );
  });
  it("fail to add skill due to reapeated", async () => {
    const skill: Skill = new Skill({
      name: "python",
      level: "beginner",
      freelancerId: "",
    });
    const skills: Skill[] = [
      new Skill({ name: "python", level: "beginner", freelancerId: "" }),
    ];
    const emptyFreelancer: Freelancer = Freelancer.create({
      userId: UserId.create(new UniqueEntityID()),
      about: About.update(
        "Lorem ipsum dolor sit amet, consectetur adipiscing."
      ),
      skills: Skills.create(skills),
      languages: Languages.create([]),
      education: Educations.create([]),
      experience: Experiences.create([]),
      certifications: Certifications.create([]),
    });

    mockRepository.create.mockResolvedValue(skill);
    mockFreelanceRepository.getById.mockResolvedValue(emptyFreelancer);

    expect(async () => await addSkillUseCase.execute(skill)).rejects.toThrow(
      "a skill with that name alredy exist"
    );
  });
});
