import { SocialLink } from "@/contexts/CoreContext/domain/valueObjects/SocialLink";
import { ApiError } from "@/contexts/Shared/infrastructure/errors/ApiError";
import { ValueObject } from "@/contexts/Shared/domain/ValueObject";

describe("SocialLink", () => {
  describe("create", () => {
    it("should create a valid social link", () => {
      const link = SocialLink.create({
        platform: "linkedin",
        url: "https://linkedin.com/in/test",
      });
      expect(link.platform).toBe("linkedin");
      expect(link.url).toBe("https://linkedin.com/in/test");
    });

    it("should throw if url is missing", () => {
      expect(() => SocialLink.create({ platform: "youtube", url: "" })).toThrow(
        ApiError
      );
      expect(() => SocialLink.create({ platform: "youtube", url: "" })).toThrow(
        "SocialLink is required"
      );
    });

    it("should throw if platform is invalid", () => {
      expect(() =>
        SocialLink.create({
          platform: "tiktok" as unknown as SocialLink["platform"],
          url: "https://tiktok.com",
        })
      ).toThrow("Invalid SocialLink");
    });

    it("should throw if both platform and url are invalid", () => {
      expect(() =>
        SocialLink.create({
          platform: "invalid" as unknown as SocialLink["platform"],
          url: "badurl",
        })
      ).toThrow("Invalid SocialLink");
    });
  });

  describe("structure", () => {
    it("should extend ValueObject", () => {
      const link = SocialLink.create({
        platform: "instagram",
        url: "https://instagram.com/user",
      });
      expect(link).toBeInstanceOf(ValueObject);
    });

    it("should expose platform and url getters", () => {
      const link = SocialLink.create({
        platform: "youtube",
        url: "https://youtube.com/user",
      });
      expect(link.platform).toBe("youtube");
      expect(link.url).toBe("https://youtube.com/user");
    });
  });
});
