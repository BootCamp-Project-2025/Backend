import { CertificationCollection } from "@/contexts/CoreContext/domain/collections/CertificationCollection";
import { EducationCollection } from "@/contexts/CoreContext/domain/collections/EducationCollection";
import { ExperienceCollection } from "@/contexts/CoreContext/domain/collections/ExperienceCollection";
import { LanguageCollection } from "@/contexts/CoreContext/domain/collections/LanguageCollection";
import { SkillCollection } from "@/contexts/CoreContext/domain/collections/SkillCollection";
import { Certification } from "@/contexts/CoreContext/domain/entities/Certification";
import { Education } from "@/contexts/CoreContext/domain/entities/Education";
import { Experience } from "@/contexts/CoreContext/domain/entities/Experience";
import { Freelancer } from "@/contexts/CoreContext/domain/entities/Freelancer";
import { About } from "@/contexts/CoreContext/domain/valueObjects/About";
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

    const skillCollection = SkillCollection.create([
      new Skill({ name: "JavaScript", level: "advanced" }),
      new Skill({ name: "React", level: "intermediate" }),
    ]);

    const languageCollection = LanguageCollection.create({
      languages: [
        new Language({ name: "english", level: "native" }),
        new Language({ name: "Spanish", level: "basic" }),
      ],
    });

    const educationCollection = EducationCollection.create();
    const education = Education.create({
      university: "MIT",
      career: "Computer Science",
      startDate: new Date("2015-09-01"),
      finishDate: new Date("2019-06-30"),
    });
    educationCollection.add(education);

    const experienceCollection = ExperienceCollection.create();
    const experience = Experience.create({
      position: "Frontend Developer",
      employer: "TechCorp",
      country: "USA",
      startDate: new Date("2020-01-01"),
      endDate: new Date("2022-01-01"),
      description: "Worked on large-scale applications using React and Redux.",
    });
    experienceCollection.add(experience);

    const certificationCollection = CertificationCollection.create();
    const certification = Certification.create({
      certification: "AWS Certified Developer",
      institution: "Amazon",
      year: 2021,
    });
    certificationCollection.add(certification);

    const freelancer = Freelancer.create({
      userId,
      about,
      skills: skillCollection,
      languages: languageCollection,
      education: educationCollection,
      experience: experienceCollection,
      certifications: certificationCollection,
    });

    expect(freelancer).toBeDefined();
    expect(freelancer.userId.equals(userId)).toBe(true);
    expect(freelancer.about.value).toBe(
      "Passionate full-stack developer with 5+ years of experience."
    );
    expect(freelancer.skills.getAll().length).toBe(2);
    expect(freelancer.languages.getAll().length).toBe(2);
    expect(freelancer.education.getAll().length).toBe(1);
    expect(freelancer.experience.getAll().length).toBe(1);
    expect(freelancer.certifications.getAll().length).toBe(1);
  });
});
