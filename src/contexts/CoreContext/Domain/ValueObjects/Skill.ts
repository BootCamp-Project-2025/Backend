export type SkillLevel = "beginner" | "intermediate" | "advanced";
//No necesito un id, dos skills con el mismo nombre y nivel son considerados iguales
export class Skill {
  private readonly _name: string;
  private readonly _level: SkillLevel;

  constructor(name: string, level: SkillLevel) {
    if (!name || name.trim().length === 0) {
      throw new Error("Skill name is required");
    }

    if (!["beginner", "intermediate", "advanced"].includes(level)) {
      throw new Error(`Invalid skill level: ${level}`);
    }

    this._name = name.trim();
    this._level = level;
  }

  get name(): string {
    return this._name;
  }

  get level(): SkillLevel {
    return this._level;
  }

  equals(other: Skill): boolean {
    return this._name.toLowerCase() === other.name.toLowerCase();
  }
}
