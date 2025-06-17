import { Entity } from "@/contexts/Shared/domain/Entity";

interface CertificationProps {
  certification: string;
  institution: string;
  year: number;
}

export class Certification extends Entity<CertificationProps> {
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

  public edit(props: CertificationProps): void {
    this.props.certification = props.certification;
    this.props.year = props.year;
    this.props.institution = props.institution;
  }

  get year(): number {
    return this.props.year;
  }
}
