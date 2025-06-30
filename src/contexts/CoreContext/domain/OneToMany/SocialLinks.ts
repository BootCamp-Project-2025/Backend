import { ManyRelationship } from "@/contexts/Shared/domain/ManyRelationship";
import { SocialLink } from "../valueObjects/SocialLink";

export class SocialLinks extends ManyRelationship<SocialLink> {
  private static readonly MAX_SOCIAL_LINKS = 4;

  compareItems(a: SocialLink, b: SocialLink): boolean {
    return a.platform === b.platform;
  }

  public static create(socialLinks: SocialLink[] = []): SocialLinks {
    if (socialLinks.length > this.MAX_SOCIAL_LINKS) {
      throw new Error(
        `A user can have at most ${this.MAX_SOCIAL_LINKS} social links.`
      );
    }

    return new SocialLinks(socialLinks);
  }

  public add(socialLink: SocialLink): void {
    if (this.getItems().length >= SocialLinks.MAX_SOCIAL_LINKS) {
      throw new Error("You can't add more than 4 social links.");
    }

    if (this.repeatedPlatform(socialLink)) {
      throw new Error("A social link with that platform already exists.");
    }

    if (!this.exists(socialLink)) {
      super.add(socialLink);
    }
  }

  public remove(socialLink: SocialLink): void {
    super.remove(socialLink);
  }

  public edit(editedSocialLink: SocialLink): void {
    const index = this.getItems().findIndex(
      (socialLink) => socialLink.platform === editedSocialLink.platform
    );
    if (index === -1) {
      throw new Error("Social link does not exist.");
    }
    super.edit(editedSocialLink, index);
  }

  public repeatedPlatform(newSocialLink: SocialLink): boolean {
    return this.getItems().some(
      (socialLink) => socialLink.platform === newSocialLink.platform
    );
  }
}
