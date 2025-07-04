import { UniqueEntityID } from "@/contexts/Shared/domain/UniqueEntityID";
import { Entity } from "../../../Shared/domain/Entity";
import { SyllabusSectionTitle } from "../valueObjects/SyllabusSectionTitle";
import { Lessons } from "../OneToMany/Lessons";

interface ModuleProps {
  courseId: string;
  name: SyllabusSectionTitle;
  position: number;
  lessons: Lessons;
}

export class Module extends Entity<ModuleProps> {
  private constructor(props: ModuleProps, id?: UniqueEntityID) {
    super(props, id);
  }
  public static create(props: ModuleProps, id?: UniqueEntityID): Module {
    return new Module(
      { ...props, lessons: props.lessons ? props.lessons : Lessons.create([]) },
      id
    );
  }
  get id(): UniqueEntityID {
    return this._id;
  }
}
