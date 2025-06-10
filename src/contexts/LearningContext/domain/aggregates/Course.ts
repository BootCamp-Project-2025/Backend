import { UniqueEntityID } from "@/contexts/Shared/domain/UniqueEntityID";
import { AggregateRoot } from "../../../Shared/domain/AgregateRoot";
import Module from "module";
import { CourseName } from "../valueObjects/CourseName";
import { CourseField } from "../valueObjects/CourseField";
import { CourseRequirements } from "../valueObjects/CourseRequirements";
import { CourseDescription } from "../valueObjects/CourseDescription";

export interface CourseProps {
    name: CourseName;
    field: CourseField;
    requirements: CourseRequirements;
    description: CourseDescription;
    imgSrc: string;
    modules?: Module[];
    time: number;
}

type CoursePrimitiveProps = {
    name: string;
    id: string;
    field: string;
    requirements: string;
    time: number;
    description: string;
    imgSrc: string;
};

export class Course extends AggregateRoot<CourseProps> {
    private constructor(props: CourseProps, id?: UniqueEntityID) {
        super(props, id);
    }

    public static create(props: CourseProps, id?: UniqueEntityID): Course {
        return new Course(
            { ...props, modules: props.modules ? props.modules : [] },
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

        const course: CourseProps = {
            name: nameValue,
            field: fieldValue,
            requirements: requirementsValue,
            description: descriptionValue,
            time: props.time,
            imgSrc: props.imgSrc,
        };
        return Course.create(course, id);
    }

    getName(): CourseName {
        return this.props.name;
    }

    getField(): CourseField {
        return this.props.field;
    }

    getRequirements(): CourseRequirements {
        return this.props.requirements;
    }

    getDescription(): CourseDescription {
        return this.props.description;
    }

    getImgSrc(): string {
        return this.props.imgSrc;
    }

    getModules(): Module[] {
        return this.props.modules ?? [];
    }

    getTime(): number {
        return this.props.time;
    }
}