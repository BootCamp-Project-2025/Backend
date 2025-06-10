import { Education } from "@/contexts/CoreContext/domain/entities/Education";
import { Experience } from "@/contexts/CoreContext/domain/entities/Experience";
import { Freelancer } from "@/contexts/CoreContext/domain/entities/Freelancer";
import { CertificationService } from "@/contexts/CoreContext/domain/services/CertificationService";
import { EducationService } from "@/contexts/CoreContext/domain/services/EducationService";
import { ExperienceService } from "@/contexts/CoreContext/domain/services/ExperienceService";
import { LanguageService } from "@/contexts/CoreContext/domain/services/LanguageService";
import { SkillService } from "@/contexts/CoreContext/domain/services/SkillService";
import { About } from "@/contexts/CoreContext/domain/valueObjects/About";
import { Certification } from "@/contexts/CoreContext/domain/valueObjects/Certification";
import { Language } from "@/contexts/CoreContext/domain/valueObjects/Language";
import { Skill } from "@/contexts/CoreContext/domain/valueObjects/Skill";
import { UserId } from "@/contexts/CoreContext/domain/valueObjects/UserId";
import { UniqueEntityID } from "@/contexts/Shared/Domain/UniqueEntityID";

describe("Freelancer Entity", () => {
  it("should create a valid Freelancer with all properties", () => {
    const userId = UserId.create(new UniqueEntityID());

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

    const freelancer = Freelancer.create({
      userId,
      about,
      skills: skillService.getAll(),
      languages: languageService.getAll(),
      education: educationService.getAll(),
      experience: experienceService.getAll(),
      certifications: certificationService.getAll(),
    });

    expect(freelancer).toBeDefined();
    expect(freelancer.userId.equals(userId)).toBe(true);
    expect(freelancer.about.value).toBe(
      "Passionate full-stack developer with 5+ years of experience."
    );
    expect(freelancer.skills.length).toBe(2);
    expect(freelancer.languages.length).toBe(2);
    expect(freelancer.education.length).toBe(1);
    expect(freelancer.experience.length).toBe(1);
    expect(freelancer.certifications.length).toBe(1);
  });
});
