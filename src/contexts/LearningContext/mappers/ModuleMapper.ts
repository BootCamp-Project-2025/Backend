import { UniqueEntityID } from "@/contexts/Shared/domain/UniqueEntityID";
import { ModuleDTO } from "../domain/dtos/ModuleDTO";
import { Module } from "../domain/entities/Module";
import LessonMapper from "./LessonMapper";
import { SyllabusSectionTitle } from "../domain/valueObjects/SyllabusSectionTitle";
import { Lessons } from "../domain/OneToMany/Lessons";
import { Decimal } from "@prisma/client/runtime/library";
import { ModuleDb } from "../domain/dtos/Dbtypes";

export default class ModuleMapper {
  static bulkDtoToDomain(moduleDtos: ModuleDTO[]): Module[] {
    return moduleDtos.map((moduleDto) => ModuleMapper.DtoToDomain(moduleDto));
  }

  static bulkPersistanceToDomain(moduleDtos: ModuleDb[]): Module[] {
    return moduleDtos.map((moduleDto) =>
      ModuleMapper.PersistanceToDomain(moduleDto)
    );
  }

  static bulkDomainToDto(modules: Module[]): ModuleDTO[] {
    return modules.map((module) => ModuleMapper.DomainToDto(module));
  }

  static DtoToDomain(moduleDto: ModuleDTO): Module {
    return Module.create(
      {
        title: SyllabusSectionTitle.create({ title: moduleDto.title }),
        lessons: Lessons.create(
          moduleDto.lessons?.map((lesson) => LessonMapper.DtoToDomain(lesson))
        ),
        position: moduleDto.position as number,
      },
      new UniqueEntityID(moduleDto.id)
    );
  }

  static DomainToDto(module: Module): ModuleDTO {
    return {
      id: module.id.toString(),
      title: module.props.title.props.title,
      lessons: module.props.lessons
        .getItems()
        .map((lesson) => LessonMapper.DomainToDto(lesson)),
      position: module.props.position,
    };
  }

  static DomainToPersistance(module: Module, courseId: string): ModuleDb {
    return {
      courseId: courseId,
      id: module.id.toString(),
      title: module.props.title.props.title,
      lessons: module.props.lessons
        .getItems()
        .map((lesson) =>
          LessonMapper.DomainToPersistance(lesson, module.id.toString())
        ),
      position: new Decimal(module.props.position),
    };
  }

  static PersistanceToDomain(moduleDto: ModuleDb): Module {
    return Module.create(
      {
        title: SyllabusSectionTitle.create({ title: moduleDto.title }),
        lessons: Lessons.create(
          moduleDto.lessons?.map((lesson) =>
            LessonMapper.PersistanceToDomain(lesson)
          )
        ),
        position: moduleDto.position.toNumber(),
      },
      new UniqueEntityID(moduleDto.id)
    );
  }
}
