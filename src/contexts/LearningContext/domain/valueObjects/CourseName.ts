import { ValueObject } from "@/contexts/Shared/domain/ValueObject";

interface CourseNameProps {
    [name: string]: string;
}

export class CourseName extends ValueObject<CourseNameProps> {
    private constructor(props: CourseNameProps) {
        super(props);
    }

    public get value(): string {
        return this.props.name;
    }

    public static create(props: CourseNameProps): CourseName {
        if (!props.name || typeof props.name !== "string") {
            throw new Error("Invalid course name");
        }
        return new CourseName(props);
    }
}