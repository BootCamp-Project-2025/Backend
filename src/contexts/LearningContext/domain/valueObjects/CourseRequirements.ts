import { ValueObject } from "@/contexts/Shared/domain/ValueObject";

interface CourseRequirementsProps {
    [requirements: string]: string;
}

export class CourseRequirements extends ValueObject<CourseRequirementsProps> {
    private constructor(props: CourseRequirementsProps) {
        super(props);
    }

    public get value(): string {
        return this.props.requirements;
    }

    public static create(props: CourseRequirementsProps): CourseRequirements {
        if (!props.requirements || typeof props.requirements !== "string") {
            throw new Error("Invalid field value");
        }
        return new CourseRequirements(props);
    }
}