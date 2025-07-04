import { ManyRelationship } from "@/contexts/Shared/domain/ManyRelationship";
import { StatusCodes } from "http-status-codes";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { Module } from "../entities/Module";

export class Modules extends ManyRelationship<Module> {
  private constructor(modules: Module[]) {
    if (modules.length > 5) {
      throw new ApiError(
        StatusCodes.BAD_REQUEST,
        "A course can have up to 5 modules."
      );
    }
    super(modules);
  }

  compareItems(a: Module, b: Module): boolean {
    return a.equals(b);
  }

  public static create(educations: Module[] = []): Modules {
    return new Modules(educations);
  }

  public add(module: Module): void {
    if (this.getItems().length >= 5) {
      throw new ApiError(
        StatusCodes.BAD_REQUEST,
        "Cannot add more than 5 modules."
      );
    }
    super.add(module);
  }

  public edit(editedModule: Module): void {
    const index = this.getItems().findIndex((module) =>
      module.id.equals(editedModule.id)
    );

    super.edit(editedModule, index);
  }

  public removeById(id: string): void {
    const index = this.getItems().findIndex((e) => e.id.toString() === id);
    if (index === -1)
      throw new ApiError(StatusCodes.CONTINUE, "module doesnt exist");
    this.remove(this.getItems()[index]);
  }

  public remove(module: Module): void {
    super.remove(module);
  }
}
