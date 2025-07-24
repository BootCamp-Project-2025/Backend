import ISocialLinkDto from "./ISocialLinkDto";
export interface IClientProfileDto {
  userId: string;
  id?: string;
  phoneNumber: string | undefined;
  country: string | undefined;
  city: string | undefined;
  gender: string | undefined;
  dateOfBirth: Date | undefined;
  socialLinks: ISocialLinkDto[] | undefined;
}
