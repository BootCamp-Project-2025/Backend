export type SessionDTO = {
  id?: string;
  url: string;
  dateOfTheSession: Date;
  creationDate: Date;
  status: "COMPLETED" | "PENDING" | "CANCELED";
};
