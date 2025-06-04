export interface ISampleDataRequest {
  content: string;
}

export class SampleDataRequest implements ISampleDataRequest {
  constructor(public content: string) {}
}
