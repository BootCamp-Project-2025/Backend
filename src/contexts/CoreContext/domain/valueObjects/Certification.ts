import { ValueObject } from "@/contexts/Shared/Domain/ValueObject";

interface CertificationProps {
  certification: string;
  institution: string;
  year: number;
}

export class Certification extends ValueObject<CertificationProps> {
  private constructor(props: CertificationProps) {
    super(props);
  }

  public static create(props: CertificationProps): Certification {
    if (!props.certification || !props.institution || !props.year) {
      throw new Error("All fields are required for a certification.");
    }
    return new Certification(props);
  }

  get certification(): string {
    return this.props.certification;
  }

  get institution(): string {
    return this.props.institution;
  }

  get year(): number {
    return this.props.year;
  }
}
