import { User } from "@/contexts/CoreContext/domain/aggregates/User";
import { Client } from "@/contexts/CoreContext/domain/aggregates/Client";
import { Education } from "@/contexts/CoreContext/domain/entities/Education";
import { Experience } from "@/contexts/CoreContext/domain/entities/Experience";
import { Freelancer } from "@/contexts/CoreContext/domain/aggregates/Freelancer";
import { About } from "@/contexts/CoreContext/domain/valueObjects/About";
import { Certification } from "@/contexts/CoreContext/domain/entities/Certification";
import { Language } from "@/contexts/CoreContext/domain/entities/Language";
import { Skill } from "@/contexts/CoreContext/domain/entities/Skill";
import { UserEmail } from "@/contexts/CoreContext/domain/valueObjects/UserEmail";
import { UserId } from "@/contexts/CoreContext/domain/valueObjects/UserId";
import { UserName } from "@/contexts/CoreContext/domain/valueObjects/UserName";
import { UniqueEntityID } from "@/contexts/Shared/domain/UniqueEntityID";
import { Skills } from "@/contexts/CoreContext/domain/OneToMany/Skills";
import { Languages } from "@/contexts/CoreContext/domain/OneToMany/Languages";
import { Educations } from "@/contexts/CoreContext/domain/OneToMany/Educations";
import { Experiences } from "@/contexts/CoreContext/domain/OneToMany/Experiences";
import { Certifications } from "@/contexts/CoreContext/domain/OneToMany/Certifications";

describe("User Aggregate", () => {
  const userName = UserName.create("George Orwell");
  const userEmail = UserEmail.create("george@example.com");
  const userId = UserId.create(new UniqueEntityID());

  //Client
  const client = Client.create({ userId });

  const about = About.update(
    "Passionate full-stack developer with 5+ years of experience."
  );

  const skillService = Skills.create([
    new Skill(
      { name: "JavaScript", level: "advanced", freelancerId: "" },
      new UniqueEntityID()
    ),
    new Skill(
      { name: "React", level: "intermediate", freelancerId: "" },
      new UniqueEntityID()
    ),
  ]);

  const languageService = Languages.create([
    new Language({ name: "english", level: "native" }, new UniqueEntityID()),
    new Language({ name: "Spanish", level: "basic" }, new UniqueEntityID()),
  ]);

  const educationService = Educations.create();
  const education = Education.create({
    university: "MIT",
    career: "Computer Science",
    startDate: new Date("2015-09-01"),
    finishDate: new Date("2019-06-30"),
  });
  educationService.add(education);

  const experienceService = Experiences.create();
  const experience = Experience.create({
    position: "Frontend Developer",
    employer: "TechCorp",
    country: "USA",
    startDate: new Date("2020-01-01"),
    endDate: new Date("2022-01-01"),
    description: "Worked on large-scale applications using React and Redux.",
  });
  experienceService.add(experience);

  const certificationService = Certifications.create();
  const certification = Certification.create(
    {
      certification: "AWS Certified Developer",
      institution: "Amazon",
      year: 2021,
    },
    new UniqueEntityID()
  );
  certificationService.add(certification);

  //Freelancer
  const freelancer = Freelancer.create({
    userId,
    about,
    skills: skillService,
    languages: languageService,
    education: educationService,
    experience: experienceService,
    certifications: certificationService,
  });

  it("should create a User with CLIENT role", () => {
    const user = User.create({
      userName,
      userEmail,
      roles: ["CLIENT"],
      clientId: new UniqueEntityID(),
      createdAt: new Date(),
    });

    expect(user).toBeDefined();
    expect(user.isClient).toBe(true);
    expect(user.props.clientId).toBeDefined();
    expect(user.props.freelancerId).toBeUndefined();
  });

  it("should create a User with FREELANCER role", () => {
    const user = User.create({
      userName,
      userEmail,
      roles: ["FREELANCER"],
      freelancerId: new UniqueEntityID(),
      createdAt: new Date(),
    });

    expect(user).toBeDefined();
    expect(user.isFreelancer).toBe(true);
    expect(user.props.freelancerId).toBeDefined();
    expect(user.props.clientId).toBeUndefined();
  });

  it("should throw if FREELANCER role is present but no profile", () => {
    expect(() =>
      User.create({
        userName,
        userEmail,
        roles: ["FREELANCER"],
        createdAt: new Date(),
      })
    ).toThrow("Freelancer profile is required for role FREELANCER.");
  });

  /* Comentado hasta avanzar con Client */

  /*  it("should throw if CLIENT role is present but no profile", () => {
    expect(() =>
      User.create({
        userName,
        userEmail,
        roles: ["CLIENT"],
        createdAt: new Date(),
      })
    ).toThrow("Client profile is required for role CLIENT.");
  }); */

  it("should default to CLIENT role if roles are missing and clientProfile is provided", () => {
    const user = User.create({
      userName,
      userEmail,
      clientId: new UniqueEntityID(),
      createdAt: new Date(),
      roles: [],
    });

    expect(user.roles).toContain("CLIENT");
    expect(user.isClient).toBe(true);
  });

  it("should allow adding new roles and profiles after creation", () => {
    const user = User.create({
      userName,
      userEmail,
      roles: ["CLIENT"],
      clientId: new UniqueEntityID(),
      createdAt: new Date(),
    });

    user.assignFreelancerProfile(new UniqueEntityID());

    expect(user.roles).toContain("FREELANCER");
    expect(user.props.freelancerId).toBeDefined();
  });
});
