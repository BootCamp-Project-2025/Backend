import { UniqueEntityID } from "@/contexts/Shared/domain/UniqueEntityID";
import { ModuleDTO } from "../domain/dtos/ModuleDTO";
import { Module } from "../domain/entities/Module";
import LessonMapper from "./LessonMapper";
import { SyllabusSectionTitle } from "../domain/valueObjects/SyllabusSectionTitle";
import { Lessons } from "../domain/OneToMany/Lessons";
import { Decimal } from "@prisma/client/runtime/library";
import { ModuleDb } from "../domain/dtos/Dbtypes";
import { ModuleQuiz } from "../domain/valueObjects/ModuleQuiz";

const ModuleMapper = {
  bulkDtoToDomain(moduleDtos: ModuleDTO[]): Module[] {
    return moduleDtos.map((moduleDto) => ModuleMapper.DtoToDomain(moduleDto));
  },

  bulkPersistanceToDomain(moduleDtos: ModuleDb[]): Module[] {
    return moduleDtos.map((moduleDto) =>
      ModuleMapper.PersistanceToDomain(moduleDto)
    );
  },

  bulkDomainToDto(modules: Module[]): ModuleDTO[] {
    return modules.map((module) => ModuleMapper.DomainToDto(module));
  },

  DtoToDomain(moduleDto: ModuleDTO): Module {
    return Module.create(
      {
        title: SyllabusSectionTitle.create({ title: moduleDto.title }),
        lessons: Lessons.create(
          moduleDto.lessons?.map((lesson) => LessonMapper.DtoToDomain(lesson))
        ),
        position: moduleDto.position as number,
        quizzes: moduleDto.quizzes.map((quiz) => ModuleQuiz.create(quiz)) ?? [],
      },
      new UniqueEntityID(moduleDto.id)
    );
  },

  DomainToDto(module: Module): ModuleDTO {
    return {
      id: module.id.toString(),
      title: module.props.title.props.title,
      lessons: module.props.lessons
        .getItems()
        .map((lesson) => LessonMapper.DomainToDto(lesson)),
      position: module.props.position,
      quizzes: module.props.quizzes.map((quiz) => ({
        name: quiz.name,
        url: quiz.url,
      })),
    };
  },

  DomainToPersistance(module: Module, courseId: string): ModuleDb {
    return {
      courseId,
      id: module.id.toString(),
      title: module.props.title.props.title,
      lessons: module.props.lessons
        .getItems()
        .map((lesson) =>
          LessonMapper.DomainToPersistance(lesson, module.id.toString())
        ),
      position: new Decimal(module.props.position),
      quizzes: module.props.quizzes.map((quiz) => ({
        name: quiz.name,
        url: quiz.url,
      })),
    };
  },

  PersistanceToDomain(moduleDto: ModuleDb): Module {
    return Module.create(
      {
        title: SyllabusSectionTitle.create({ title: moduleDto.title }),
        lessons: Lessons.create(
          moduleDto.lessons?.map((lesson) =>
            LessonMapper.PersistanceToDomain(lesson)
          )
        ),
        position: moduleDto.position.toNumber(),
        quizzes: moduleDto.quizzes.map((quiz) => ModuleQuiz.create(quiz)) ?? [],
      },
      new UniqueEntityID(moduleDto.id)
    );
  },
};
export default ModuleMapper;
