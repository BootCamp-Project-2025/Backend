import { UniqueEntityID } from "@/contexts/Shared/domain/UniqueEntityID";
import { ModuleDTO } from "../domain/dtos/ModuleDTO";
import { Module } from "../domain/entities/Module";
import LessonMapper from "./LessonMapper";

export default class ModuleMapper {
  static DtoToDomain(moduleDto: ModuleDTO): Module {
    return Module.create(
      {
        name: moduleDto.name,
        lessons: moduleDto.lessons.map((lesson) =>
          LessonMapper.DtoToDomain(lesson)
        ),
      },
      new UniqueEntityID(moduleDto.id)
    );
  }

  static DomainToDto(module: Module): ModuleDTO {
    return {
      id: module.id.toString(),
      name: module.props.name,
      lessons: module.props.lessons.map((lesson) =>
        LessonMapper.DomainToDTO(lesson)
      ),
    };
  }
}
