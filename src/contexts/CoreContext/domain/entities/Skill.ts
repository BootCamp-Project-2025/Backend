import { Entity } from "@/contexts/Shared/domain/Entity";
import { UniqueEntityID } from "@/contexts/Shared/domain/UniqueEntityID";

export type SkillLevel = "beginner" | "intermediate" | "advanced";

interface SkillProps {
  name: string;
  level: SkillLevel;
  freelancerId: string;
}

export class Skill extends Entity<SkillProps> {
  private readonly _name: string;
  private readonly _level: SkillLevel;

  constructor(props: SkillProps, id?: UniqueEntityID) {
    super(props, id);
    if (!props.name || props.name.trim().length === 0) {
      throw new Error("Skill name is required");
    }

    if (!["beginner", "intermediate", "advanced"].includes(props.level)) {
      throw new Error(`Invalid skill level: ${props.level}`);
    }

    this._name = props.name.trim();
    this._level = props.level;
  }
  public static create(props: SkillProps, id: UniqueEntityID): Skill {
    if (!props.name || !props.level) {
      throw new Error("skills must have a name and level");
    }
    return new Skill(props, id);
  }

  get name(): string {
    return this._name;
  }

  get freelancerId(): string {
    return this.props.freelancerId;
  }

  get id(): UniqueEntityID {
    return this._id;
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
