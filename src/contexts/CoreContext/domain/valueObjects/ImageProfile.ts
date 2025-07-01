export class ImageProfile {
  private constructor(public readonly value: string) {}

  static create(imageUrl: string): ImageProfile {
    return new ImageProfile(imageUrl);
  }
}
