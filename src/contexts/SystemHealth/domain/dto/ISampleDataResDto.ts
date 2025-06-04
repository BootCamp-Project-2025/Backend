export interface ISampleDataResponse {
  id: string;
  content: string;
}

export class SampleDataRequest implements ISampleDataResponse {
  constructor(
    public id: string,
    public content: string
  ) {}
}
