import { ManyRelationship } from "@/contexts/Shared/domain/ManyRelationship";
import { StatusCodes } from "http-status-codes";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { Module } from "../entities/Module";

export class Modules extends ManyRelationship<Module> {
  // deepsource-disable class-methods-use-this
  compareItems(a: Module, b: Module): boolean {
    return a.equals(b);
  }

  public static create(modules: Module[] = []): Modules {
    return new Modules(modules);
  }

  public edit(editedModule: Module): void {
    const index = this.getItems().findIndex((module) =>
      module.id.equals(editedModule.id)
    );

    super.edit(editedModule, index);
  }

  public add(module: Module): void {
    if (this.getItems().length >= 10)
      throw new ApiError(
        StatusCodes.BAD_REQUEST,
        "You can only add up to 10 modules"
      );
    super.add(module);
  }

  public removeById(id: string): void {
    const index = this.getItems().findIndex((e) => e.id.toString() === id);
    if (index === -1)
      throw new ApiError(StatusCodes.CONTINUE, "module doesnt exist");
    super.remove(this.getItems()[index]);
  }
}
