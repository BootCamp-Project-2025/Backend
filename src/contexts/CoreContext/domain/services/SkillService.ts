import { Skill } from "../valueObjects/Skill";
import { ISkillService } from "../interfaces/services/ISkillService";

export class SkillService implements ISkillService {
  private static readonly MAX_SKILLS = 10;
  private items: Skill[];

  private constructor(items: Skill[]) {
    this.items = items;
  }

  public static create(items: Skill[] = []): SkillService {
    if (items.length > this.MAX_SKILLS) {
      throw new Error(
        `A freelancer can have at most ${this.MAX_SKILLS} skills.`
      );
    }

    const uniqueSkills = this.removeDuplicates(items);
    return new SkillService(uniqueSkills);
  }

  public add(skill: Skill): void {
    if (this.items.length >= SkillService.MAX_SKILLS) {
      throw new Error("You can't add more than 10 skills.");
    }

    if (!this.contains(skill)) {
      this.items.push(skill);
    }
  }

  public remove(skill: Skill): void {
    this.items = this.items.filter((s) => s.name !== skill.name);
  }

  public contains(skill: Skill): boolean {
    return this.items.some((s) => s.name === skill.name);
  }

  public getAll(): Skill[] {
    return [...this.items];
  }

  private static removeDuplicates(skills: Skill[]): Skill[] {
    const seen = new Set<string>();
    return skills.filter((skill) => {
      if (seen.has(skill.name)) return false;
      seen.add(skill.name);
      return true;
    });
  }
}
