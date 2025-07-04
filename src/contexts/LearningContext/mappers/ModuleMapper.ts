import { UniqueEntityID } from "@/contexts/Shared/domain/UniqueEntityID";
import { ModuleDTO } from "../domain/dtos/ModuleDTO";
import { Module } from "../domain/entities/Module";
import LessonMapper from "./LessonMapper";
import { SyllabusSectionTitle } from "../domain/valueObjects/SyllabusSectionTitle";
import { Lessons } from "../domain/OneToMany/Lessons";

export default class ModuleMapper {
  static bulkDtoToDomain(moduleDtos: ModuleDTO[]): Module[] {
    return moduleDtos.map((moduleDto) => ModuleMapper.DtoToDomain(moduleDto));
  }

  static bulkDomainToDto(modules: Module[]): ModuleDTO[] {
    return modules.map((module) => ModuleMapper.DomainToDto(module));
  }

  static DtoToDomain(moduleDto: ModuleDTO): Module {
    return Module.create(
      {
        courseId: moduleDto.courseId ?? "",
        name: SyllabusSectionTitle.create({ title: moduleDto.name }),
        lessons: Lessons.create(
          moduleDto.lessons?.map((lesson) => LessonMapper.DtoToDomain(lesson))
        ),
        position: moduleDto.position,
      },
      new UniqueEntityID(moduleDto.id)
    );
  }

  static DomainToDto(module: Module): ModuleDTO {
    return {
      id: module.id.toString(),
      name: module.props.name.props.title,
      lessons: module.props.lessons
        .getItems()
        .map((lesson) => LessonMapper.DomainToDTO(lesson)),
      courseId: module.props.courseId,
      position: module.props.position,
    };
  }
}
