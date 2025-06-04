import { Entity } from "@/contexts/Shared/Domain/Entity";
import { UniqueEntityID } from "@/contexts/Shared/Domain/UniqueEntityID";
import { Skill } from "../valueObjects/Skill";

interface SkillCollectionProps {
  items: Skill[];
}

export class SkillCollection extends Entity<SkillCollectionProps> {
  private static readonly MAX_SKILLS = 10;

  get skills(): Skill[] {
    return this.props.items;
  }

  private constructor(props: SkillCollectionProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(
    items: Skill[] = [],
    id?: UniqueEntityID
  ): SkillCollection {
    if (items.length > this.MAX_SKILLS) {
      throw new Error(
        `A freelancer can have at most ${this.MAX_SKILLS} skills.`
      );
    }

    const uniqueSkills = this.removeDuplicates(items);
    return new SkillCollection({ items: uniqueSkills }, id);
  }

  public add(skill: Skill): void {
    if (this.props.items.length >= SkillCollection.MAX_SKILLS) {
      throw new Error("You can't add more than 10 skills.");
    }

    if (!this.contains(skill)) {
      this.props.items.push(skill);
    }
  }

  public remove(skill: Skill): void {
    this.props.items = this.props.items.filter((s) => !s.equals(skill));
  }

  public contains(skill: Skill): boolean {
    return this.props.items.some((s) => s.equals(skill));
  }

  private static removeDuplicates(skills: Skill[]): Skill[] {
    const unique: Skill[] = [];

    for (const s of skills) {
      if (!unique.some((u) => u.equals(s))) {
        unique.push(s);
      }
    }

    return unique;
  }
}
