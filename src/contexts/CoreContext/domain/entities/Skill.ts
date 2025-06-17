import { ValueObject } from "@/contexts/Shared/domain/ValueObject";

export type SkillLevel = "beginner" | "intermediate" | "advanced";

interface SkillProps {
  name: string;
  level: SkillLevel;
}

export class Skill extends ValueObject<SkillProps> {
  private readonly _name: string;
  private readonly _level: SkillLevel;

  constructor(props: SkillProps) {
    super(props);
    if (!props.name || props.name.trim().length === 0) {
      throw new Error("Skill name is required");
    }

    if (!["beginner", "intermediate", "advanced"].includes(props.level)) {
      throw new Error(`Invalid skill level: ${props.level}`);
    }

    this._name = props.name.trim();
    this._level = props.level;
  }

  get name(): string {
    return this._name;
  }

  public editLevel(level: "beginner" | "intermediate" | "advanced") {
    this.props.level = level;
  }

  get level(): SkillLevel {
    return this._level;
  }

  equals(other: Skill): boolean {
    return this._name.toLowerCase() === other.name.toLowerCase();
  }
}
