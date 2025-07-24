import { ValueObject } from "@/contexts/Shared/domain/ValueObject";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { StatusCodes } from "http-status-codes";

interface SocialLinkProps {
  platform: "LINKEDIN" | "YOUTUBE" | "FACEBOOK" | "INSTAGRAM";
  url: string;
}

export class SocialLink extends ValueObject<SocialLinkProps> {
  get platform(): "LINKEDIN" | "YOUTUBE" | "FACEBOOK" | "INSTAGRAM" {
    return this.props.platform;
  }

  get url(): string {
    return this.props.url;
  }

  private constructor(props: SocialLinkProps) {
    super(props);
  }

  private static isValidLink(value: string): boolean {
    const urlPattern = /^(https?:\/\/)?([\w.-]+)+(:\d+)?(\/[\w.-]*)*\/?$/;
    return urlPattern.test(value);
  }

  private static isValidPlatform(value: string): boolean {
    const validPlatforms = ["LINKEDIN", "YOUTUBE", "FACEBOOK", "INSTAGRAM"];
    return validPlatforms.some((platform) => value === platform);
  }

  public static create({ platform, url }: SocialLinkProps): SocialLink {
    if (!url) {
      throw new ApiError(StatusCodes.BAD_REQUEST, "SocialLink is required");
    }

    if (!this.isValidLink(url) || !this.isValidPlatform(platform)) {
      throw new ApiError(StatusCodes.BAD_REQUEST, "Invalid SocialLink");
    }

    return new SocialLink({ platform, url });
  }
}
