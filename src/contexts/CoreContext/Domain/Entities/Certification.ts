import { Entity } from "@/contexts/Shared/Domain/Entity";
import { UniqueEntityID } from "@/contexts/Shared/Domain/UniqueEntityID";

interface CertificationProps {
  certification: string;
  institution: string;
  year: number;
}

export class Certification extends Entity<CertificationProps> {
  private constructor(props: CertificationProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(
    props: CertificationProps,
    id?: UniqueEntityID
  ): Certification {
    if (!props.certification || !props.institution || !props.year) {
      throw new Error("All fields are required for a certification.");
    }
    return new Certification(props, id);
  }

  get certificationId(): UniqueEntityID {
    return this._id;
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
