import { Education } from "@/contexts/CoreContext/domain/entities/Education";
import { Experience } from "@/contexts/CoreContext/domain/entities/Experience";
import { Freelancer } from "@/contexts/CoreContext/domain/aggregates/Freelancer";
import { About } from "@/contexts/CoreContext/domain/valueObjects/About";
import { Certification } from "@/contexts/CoreContext/domain/entities/Certification";
import { Language } from "@/contexts/CoreContext/domain/entities/Language";
import { Skill } from "@/contexts/CoreContext/domain/entities/Skill";
import { UserId } from "@/contexts/CoreContext/domain/valueObjects/UserId";
import { UniqueEntityID } from "@/contexts/Shared/domain/UniqueEntityID";
import { Skills } from "@/contexts/CoreContext/domain/OneToMany/Skills";
import { Languages } from "@/contexts/CoreContext/domain/OneToMany/Languages";
import { Educations } from "@/contexts/CoreContext/domain/OneToMany/Educations";
import { Experiences } from "@/contexts/CoreContext/domain/OneToMany/Experiences";
import { Certifications } from "@/contexts/CoreContext/domain/OneToMany/Certifications";

describe("Freelancer Entity", () => {
  it("should create a valid Freelancer with all properties", () => {
    const userId = UserId.create(new UniqueEntityID());

    const about = About.update(
      "Passionate full-stack developer with 5+ years of experience."
    );

    const skills = Skills.create([
      new Skill(
        { name: "JavaScript", level: "advanced", freelancerId: "" },
        new UniqueEntityID()
      ),
      new Skill(
        { name: "React", level: "intermediate", freelancerId: "" },
        new UniqueEntityID()
      ),
    ]);

    const languages = Languages.create([
      new Language({ name: "english", level: "native" }, new UniqueEntityID()),
      new Language({ name: "Spanish", level: "basic" }, new UniqueEntityID()),
    ]);

    const educations = Educations.create();
    const education = Education.create({
      university: "MIT",
      career: "Computer Science",
      startDate: new Date("2015-09-01"),
      finishDate: new Date("2019-06-30"),
      freelancerId: "",
    });
    educations.add(education);

    const experiences = Experiences.create();
    const experience = Experience.create({
      position: "Frontend Developer",
      employer: "TechCorp",
      country: "USA",
      startDate: new Date("2020-01-01"),
      endDate: new Date("2022-01-01"),
      description: "Worked on large-scale applications using React and Redux.",
    });
    experiences.add(experience);

    const certifications = Certifications.create();
    const certification = Certification.create(
      {
        certification: "AWS Certified Developer",
        institution: "Amazon",
        year: 2021,
      },
      new UniqueEntityID()
    );
    certifications.add(certification);

    const freelancer = Freelancer.create({
      userId,
      about,
      skills: skills,
      languages: languages,
      education: educations,
      experience: experiences,
      certifications: certifications,
    });

    expect(freelancer).toBeDefined();
    expect(freelancer.userId.equals(userId)).toBe(true);
    expect(freelancer.about.value).toBe(
      "Passionate full-stack developer with 5+ years of experience."
    );
    expect(freelancer.skills.getItems().length).toBe(2);
    expect(freelancer.languages.getItems().length).toBe(2);
    expect(freelancer.education.getItems().length).toBe(1);
    expect(freelancer.experience.getItems().length).toBe(1);
    expect(freelancer.certifications.getItems().length).toBe(1);
  });
});
