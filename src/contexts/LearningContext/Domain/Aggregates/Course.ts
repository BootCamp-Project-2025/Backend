import { AggregateRoot } from "../../../Shared/Domain/AgregateRoot";
import Module from "module";

export interface CourseProps {
  name: string;
  field: string;
  requirements: string;
  modules?: Module[];
  time: number;
  description: string;
}

export class Course extends AggregateRoot<CourseProps> {}
