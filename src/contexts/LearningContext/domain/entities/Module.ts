import { Entity } from "../../../Shared/domain/Entity";

interface ModuleProps {
  name: string;
}

export class Module extends Entity<ModuleProps> {}
