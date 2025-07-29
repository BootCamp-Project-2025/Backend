import { UniqueEntityID } from "@/contexts/Shared/domain/UniqueEntityID";
import { Entity } from "@/contexts/Shared/domain/Entity";
import SessionUrl from "../valueObjects/SessionUrl";
import SessionStatus, {
  SessionStatusType,
} from "../valueObjects/SessionStatus";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { StatusCodes } from "http-status-codes";

export type PrimitiveLiveSessionProps = {
  url: string;
  dateOfTheSession: Date;
  creationDate: Date;
  status: SessionStatusType;
};

type LiveSessionProps = {
  url: SessionUrl;
  dateOfTheSession: Date;
  creationDate: Date;
  status: SessionStatus;
};

export default class LiveSession extends Entity<LiveSessionProps> {
  private constructor(props: LiveSessionProps, id?: UniqueEntityID) {
    super(props, id);
  }

  /**
   * @description This method create a new instance of LiveSessions from a object with the corresponding value objects
   * @param props Object with the value objects of the Live Session
   * @param id Instance of UniqueEntityID, if not sent, a new instance will be created
   * @returns A new instance of LiveSession
   */
  public static create(
    props: LiveSessionProps,
    id?: UniqueEntityID
  ): LiveSession {
    return new LiveSession({ ...props }, id);
  }

  /**
   * @description This method create a new instance of LiveSessions from a object with primitive values
   * @param props Object with the primitive values of the Live Session
   * @param id A new instance of UniqueEntityID will be created with this value, if not sent, a random value will be asigned
   * @returns A new instance of LiveSession
   */
  public static createFromPrimitive(
    props: PrimitiveLiveSessionProps,
    id?: string
  ) {
    return new LiveSession(
      {
        creationDate: props.creationDate,
        dateOfTheSession: props.dateOfTheSession,
        url: SessionUrl.create({ url: props.url }),
        status: SessionStatus.create({ status: props.status }),
      },
      new UniqueEntityID(id)
    );
  }

  get id(): UniqueEntityID {
    return this._id;
  }

  get url(): SessionUrl {
    return this.props.url;
  }

  get dateOfTheSession(): Date {
    return this.props.dateOfTheSession;
  }

  get creationDate(): Date {
    return this.props.creationDate;
  }

  get status(): SessionStatus {
    return this.props.status;
  }

  /**
   * @description Mark a session  as CANCELED.
   * @throws An ApiError if the session status is COMPLETED
   */
  public cancel(): void {
    if (this.status.value === "COMPLETED") {
      throw new ApiError(
        StatusCodes.BAD_REQUEST,
        "A canceled course cannot be completed"
      );
    }
    this.props.status = SessionStatus.create({ status: "CANCELED" });
  }

  /**
   * @description Mark a session  as COMPLETED.
   * @throws An ApiError if the session status is CANCELED
   */
  public complete(): void {
    if (this.status.value === "CANCELED") {
      throw new ApiError(
        StatusCodes.BAD_REQUEST,
        "A canceled course cannot be completed"
      );
    }
    this.props.status = SessionStatus.create({ status: "COMPLETED" });
  }
}
