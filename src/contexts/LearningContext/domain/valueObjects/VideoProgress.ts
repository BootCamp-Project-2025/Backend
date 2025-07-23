import { ValueObject } from "@/contexts/Shared/domain/ValueObject";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { StatusCodes } from "http-status-codes";

export interface VideoProgressProps {
    url: string;
    watchedSeconds: number;
    completed: boolean;
}

export class VideoProgress extends ValueObject<VideoProgressProps> {
    private constructor(props: VideoProgressProps) {
        super(props);
    }

    get url(): string {
        return this.props.url;
    }

    get watchedSeconds(): number {
        return this.props.watchedSeconds;
    }

    get completed(): boolean {
        return this.props.completed;
    }

    public static create(props: VideoProgressProps): VideoProgress {
        if (!props.url || typeof props.url !== "string") {
            throw new ApiError(StatusCodes.BAD_REQUEST, "Invalid video URL");
        }

        if (typeof props.watchedSeconds !== "number" || props.watchedSeconds < 0) {
            throw new ApiError(StatusCodes.BAD_REQUEST, "Invalid watched seconds");
        }

        if (typeof props.completed !== "boolean") {
            throw new ApiError(StatusCodes.BAD_REQUEST, "Invalid completed flag");
        }

        return new VideoProgress(props);
    }

    public setCompleted(): VideoProgress {
        return new VideoProgress({
            ...this.props,
            completed: true
        });
    }
}
