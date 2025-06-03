import { Entity } from "@/contexts/Shared/Domain/Entity";

interface ModuleProps {
  name: string;
}

export class Module extends Entity<ModuleProps> {}
