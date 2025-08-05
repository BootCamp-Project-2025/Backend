import { UniqueEntityID } from "@/contexts/Shared/domain/UniqueEntityID";
import { AggregateRoot } from "../../../Shared/domain/AgregateRoot";
import { CourseName } from "../valueObjects/CourseName";
import { CourseField } from "../valueObjects/CourseField";
import { CourseRequirements } from "../valueObjects/CourseRequirements";
import { CourseDescription } from "../valueObjects/CourseDescription";
import { Modules } from "../OneToMany/Modules";
import { CourseCategory } from "../valueObjects/CourseCategory";
import { CourseSubCategory } from "../valueObjects/CourseSubCategory";
import { CourseLanguage } from "../valueObjects/CourseLanguage";
import { UserId } from "@/contexts/CoreContext/domain/valueObjects/UserId";

export interface CourseProps {
  name: CourseName;
  field?: CourseField;
  requirements?: CourseRequirements;
  description: CourseDescription;
  imgSrc: string;
  modules: Modules;
  time?: number;
  category?: CourseCategory;
  subCategory?: CourseSubCategory;
  language?: CourseLanguage;
  userId: UserId;
  published: boolean;
  createdAt: Date | null;
}

type CoursePrimitiveProps = {
  name: string;
  id: string;
  field: string;
  requirements: string;
  time: number;
  description: string;
  imgSrc: string;
  modules?: [];
  category: string;
  subCategory: string;
  language: string;
  userId: string;
  published: boolean;
  createdAt: Date | null;
};

export class Course extends AggregateRoot<CourseProps> {
  private constructor(props: CourseProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(props: CourseProps, id?: UniqueEntityID): Course {
    return new Course(
      { ...props, modules: props.modules ? props.modules : Modules.create([]) },
      id
    );
  }

  public static createFromObject(
    props: CoursePrimitiveProps,
    id?: UniqueEntityID
  ): Course {
    const nameValue = CourseName.create({ name: props.name });
    const fieldValue = CourseField.create({ name: props.field });
    const requirementsValue = CourseRequirements.create({
      name: props.requirements,
    });
    const descriptionValue = CourseDescription.create({
      name: props.description,
    });
    const userId = UserId.create(new UniqueEntityID(props.userId));

    const course: CourseProps = {
      name: nameValue,
      field: fieldValue,
      requirements: requirementsValue,
      description: descriptionValue,
      time: props.time,
      imgSrc: props.imgSrc,
      userId,
      published: props.published,
      modules: Modules.create(props.modules ?? []),
      createdAt: props.createdAt,
    };
    return Course.create(course, id);
  }

  getName(): CourseName {
    return this.props.name;
  }

  getField(): CourseField {
    return this.props.field ?? CourseField.create({ field: "General" });
  }

  getRequirements(): CourseRequirements {
    return (
      this.props.requirements ??
      CourseRequirements.create({ requirements: "None" })
    );
  }

  getDescription(): CourseDescription {
    return this.props.description;
  }

  getImgSrc(): string {
    return this.props.imgSrc;
  }

  getCreatedAt(): Date | null {
    return this.props.createdAt;
  }

  getModules(): Modules {
    return this.props.modules ?? Modules.create([]);
  }

  getTime(): number {
    return this.props.time ?? 0;
  }

  getCategory(): CourseCategory {
    return this.props.category ?? CourseCategory.create({ category: "" });
  }

  getSubCategory(): CourseSubCategory {
    return (
      this.props.subCategory ?? CourseSubCategory.create({ subCategory: "" })
    );
  }

  getLanguage(): CourseLanguage {
    return this.props.language ?? CourseLanguage.create({ language: "" });
  }

  getUserID(): UserId {
    return this.props.userId;
  }

  setName(newName: CourseName): void {
    this.props.name = newName;
  }

  setField(newCourseField: CourseField): void {
    this.props.field = newCourseField;
  }

  setRequirements(newCourseRequirements: CourseRequirements): void {
    this.props.requirements = newCourseRequirements;
  }

  setDescription(newCourseDescription: CourseDescription): void {
    this.props.description = newCourseDescription;
  }

  setImgSrc(imgSrc: string): void {
    this.props.imgSrc = imgSrc;
  }

  setCreatedAt(createdAt: Date): void {
    this.props.createdAt = createdAt;
  }

  setTime(newTime: number): void {
    this.props.time = newTime;
  }

  setCategory(newCourseCategory: CourseCategory): void {
    this.props.category = newCourseCategory;
  }

  setSubCategory(newCourseSubCategory: CourseSubCategory): void {
    this.props.subCategory = newCourseSubCategory;
  }

  setLanguage(newCourseLanguage: CourseLanguage): void {
    this.props.language = newCourseLanguage;
  }

  getPublished(): boolean {
    return this.props.published;
  }

  setPublished(published: boolean): void {
    this.props.published = published;
  }
}
