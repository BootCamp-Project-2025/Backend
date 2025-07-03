import { Entity } from "../../../Shared/domain/Entity";
import { Lesson } from "./Lesson";

interface ModuleProps {
  name: string;
  lessons: Lesson[];
}

export class Module extends Entity<ModuleProps> {}
