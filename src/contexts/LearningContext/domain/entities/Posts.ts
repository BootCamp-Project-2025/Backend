import { Entity } from "@/contexts/Shared/domain/Entity";
import PostTitle from "../valueObjects/PostTitle";
import PostDescription from "../valueObjects/PostDescription";
import PostUrl from "../valueObjects/PostUrl";
import { UniqueEntityID } from "@/contexts/Shared/domain/UniqueEntityID";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { StatusCodes } from "http-status-codes";

export type PrimitivePostProps = {
  title: string;
  description?: string;
  url?: string;
  creationDate: Date;
};

type PostProps = {
  title: PostTitle;
  description?: PostDescription;
  url?: PostUrl;
  creationDate: Date;
};

export class Post extends Entity<PostProps> {
  private constructor(props: PostProps, id?: UniqueEntityID) {
    super(props, id);
  }

  /**
   * @description This method create a new instance of Post from a object with the corresponding value objects, it will throw a ApiError if there is no url and description
   * @param props Object with the value objects of the Post, it must contain a url, a description or both
   * @param id Instance of UniqueEntityID, if not sent, a new instance will be created
   * @returns A new instance of Post
   */
  public static create(props: PostProps, id?: UniqueEntityID): Post {
    this.validatePropsOrThrowApiError(props);
    return new Post({ ...props }, id);
  }

  private static validatePropsOrThrowApiError(props: PostProps) {
    if (props.description === undefined && props.url === undefined) {
      throw new ApiError(
        StatusCodes.BAD_REQUEST,
        "A url or a description must be passed"
      );
    }
  }

  /**
   * @description This method create a new instance of Post from a object with primitive values, it will throw a ApiError if there is no url and description
   * @param props Object with the primitive values of the Post, it must contain a url, a description or both
   * @param id A new instance of UniqueEntityID will be created with this value, if not sent, a random value will be asigned
   * @returns A new instance of Post
   */
  public static createFromPrimitive(props: PrimitivePostProps, id?: string) {
    return Post.create(
      this.createPropsFromPrimitive(props),
      new UniqueEntityID(id)
    );
  }

  private static createPropsFromPrimitive(
    props: PrimitivePostProps
  ): PostProps {
    return {
      title: PostTitle.create({ title: props.title }),
      url: props.url ? PostDescription.create({ url: props.url }) : undefined,
      description: props.description
        ? PostUrl.create({ description: props.description })
        : undefined,
      creationDate: props.creationDate,
    };
  }

  get title(): PostTitle {
    return this.props.title;
  }
  get description(): PostDescription | undefined {
    return this.props.description;
  }
  get url(): PostUrl | undefined {
    return this.props.url;
  }
  get creationDate(): Date {
    return this.props.creationDate;
  }

  get id(): UniqueEntityID {
    return this._id;
  }
}
