import { User } from "@/contexts/CoreContext/domain/aggregates/User";
import { Client } from "@/contexts/CoreContext/domain/entities/Client";
import { Education } from "@/contexts/CoreContext/domain/entities/Education";
import { Experience } from "@/contexts/CoreContext/domain/entities/Experience";
import { Freelancer } from "@/contexts/CoreContext/domain/entities/Freelancer";
import { CertificationService } from "@/contexts/CoreContext/domain/services/CertificationService";
import { EducationService } from "@/contexts/CoreContext/domain/services/EducationService";
import { ExperienceService } from "@/contexts/CoreContext/domain/services/ExperienceService";
import { LanguageService } from "@/contexts/CoreContext/domain/services/LanguageService";
import { SkillService } from "@/contexts/CoreContext/domain/services/SkillService";
import { About } from "@/contexts/CoreContext/domain/valueObjects/About";
import { Certification } from "@/contexts/CoreContext/domain/entities/Certification";
import { Language } from "@/contexts/CoreContext/domain/valueObjects/Language";
import { Skill } from "@/contexts/CoreContext/domain/valueObjects/Skill";
import { UserEmail } from "@/contexts/CoreContext/domain/valueObjects/UserEmail";
import { UserId } from "@/contexts/CoreContext/domain/valueObjects/UserId";
import { UserName } from "@/contexts/CoreContext/domain/valueObjects/UserName";
import { UniqueEntityID } from "@/contexts/Shared/domain/UniqueEntityID";

describe("User Aggregate", () => {
  const userName = UserName.create("George Orwell");
  const userEmail = UserEmail.create("george@example.com");
  const userId = UserId.create(new UniqueEntityID());

  //Client
  const client = Client.create({ userId });

  const about = About.create(
    "Passionate full-stack developer with 5+ years of experience."
  );

  const skillService = SkillService.create([
    new Skill({ name: "JavaScript", level: "advanced" }),
    new Skill({ name: "React", level: "intermediate" }),
  ]);

  const languageService = LanguageService.create([
    new Language({ name: "english", level: "native" }),
    new Language({ name: "Spanish", level: "basic" }),
  ]);

  const educationService = EducationService.create();
  const education = Education.create({
    university: "MIT",
    career: "Computer Science",
    startDate: new Date("2015-09-01"),
    finishDate: new Date("2019-06-30"),
  });
  educationService.add(education);

  const experienceService = ExperienceService.create();
  const experience = Experience.create({
    position: "Frontend Developer",
    employer: "TechCorp",
    country: "USA",
    startDate: new Date("2020-01-01"),
    endDate: new Date("2022-01-01"),
    description: "Worked on large-scale applications using React and Redux.",
  });
  experienceService.add(experience);

  const certificationService = CertificationService.create();
  const certification = Certification.create({
    certification: "AWS Certified Developer",
    institution: "Amazon",
    year: 2021,
  });
  certificationService.add(certification);

  //Freelancer
  const freelancer = Freelancer.create({
    userId,
    about,
    skills: skillService.getAll(),
    languages: languageService.getAll(),
    education: educationService.getAll(),
    experience: experienceService.getAll(),
    certifications: certificationService.getAll(),
  });

  it("should create a User with CLIENT role", () => {
    const user = User.create({
      userName,
      userEmail,
      roles: ["CLIENT"],
      clientProfile: client,
      createdAt: new Date(),
    });

    expect(user).toBeDefined();
    expect(user.isClient).toBe(true);
    expect(user.clientProfile).toBeDefined();
    expect(user.freelancerProfile).toBeUndefined();
  });

  it("should create a User with FREELANCER role", () => {
    const user = User.create({
      userName,
      userEmail,
      roles: ["FREELANCER"],
      freelancerProfile: freelancer,
      createdAt: new Date(),
    });

    expect(user).toBeDefined();
    expect(user.isFreelancer).toBe(true);
    expect(user.freelancerProfile).toBeDefined();
    expect(user.clientProfile).toBeUndefined();
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
      clientProfile: client,
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
      clientProfile: client,
      createdAt: new Date(),
    });

    user.assignFreelancerProfile(freelancer);

    expect(user.roles).toContain("FREELANCER");
    expect(user.freelancerProfile).toBeDefined();
  });
});
