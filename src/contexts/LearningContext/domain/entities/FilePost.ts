import { UniqueEntityID } from "@/contexts/Shared/domain/UniqueEntityID";
import { Entity } from "@/contexts/Shared/domain/Entity";
import FilePostUrl from "../valueObjects/FilePostUrl";

export type PrimitiveFilePostProps = {
  id?: string;
  url: string;
  creationDate: Date;
};

type FilePostProps = {
  url: FilePostUrl;
  creationDate: Date;
};

export class FilePost extends Entity<FilePostProps> {
  private constructor(props: FilePostProps, id?: UniqueEntityID) {
    super(props, id);
  }

  /**
   * @description This method create a new instance of FilePost from a object with the corresponding value objects
   * @param props Object with the value objects of the File Post
   * @param id Instance of UniqueEntityID, if not sent, a new instance will be created
   * @returns A new instance of FilePost
   */
  public static create(props: FilePostProps, id?: UniqueEntityID): FilePost {
    return new FilePost({ ...props }, id);
  }

  /**
   * @description This method create a new instance of FilePost from a object with primitive values
   * @param props Object with the primitive values of the File Post
   * @param id A new instance of UniqueEntityID will be created with this value, if not sent, a random value will be asigned
   * @returns A new instance of FilePost
   */
  public static createFromPrimitive(
    props: PrimitiveFilePostProps,
    id?: string
  ) {
    return new FilePost(
      {
        creationDate: props.creationDate,
        url: FilePostUrl.create({ url: props.url }),
      },
      new UniqueEntityID(id)
    );
  }

  get id(): UniqueEntityID {
    return this._id;
  }

  get url(): FilePostUrl {
    return this.props.url;
  }
  get creationDate(): Date {
    return this.props.creationDate;
  }

  public updateUrl(url: string): void {
    this.props.url = FilePostUrl.create({ url });
  }
}
