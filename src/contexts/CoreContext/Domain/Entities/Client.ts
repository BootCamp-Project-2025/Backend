import { Education } from "./Education";
import { Experience } from "./Experience";
import { Certification } from "./Certification";
import { LanguageCollection } from "./LanguageCollection";
import { SkillCollection } from "./SkillCollection";
import { UniqueEntityID } from "@/contexts/Shared/Domain/UniqueEntityID";
import { UserId } from "../valueObjects/UserId";
import { About } from "../valueObjects/About";
import { Entity } from "@/contexts/Shared/Domain/Entity";

interface ClientProps {
  userId: UserId; //Relation with AggregateRoot User
  about: About;
  skills: SkillCollection;
  languages: LanguageCollection;
  education: Education;
  experience: Experience;
  certifications: Certification;
}

export class Client extends Entity<ClientProps> {
  private constructor(props: ClientProps, id?: UniqueEntityID) {
    super(props, id);
  }
}

// ClientProfile (AR)
// ├── clientId: UUID
// ├── userId: UUID (referencia al User)
// ├── empresa, proyectos
