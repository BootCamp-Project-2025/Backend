import { UniqueEntityID } from "@/contexts/Shared/domain/UniqueEntityID";
import { Entity } from "../../../Shared/domain/Entity";
import { Lesson } from "./Lesson";

interface ModuleProps {
  name: string;
  lessons: Lesson[];
}

export class Module extends Entity<ModuleProps> {
  private constructor(props: ModuleProps, id?: UniqueEntityID) {
    super(props, id);
  }
  public static create(props: ModuleProps, id?: UniqueEntityID): Module {
    return new Module(
      { ...props, lessons: props.lessons ? props.lessons : [] },
      id
    );
  }
  get id(): UniqueEntityID {
    return this._id;
  }
}
