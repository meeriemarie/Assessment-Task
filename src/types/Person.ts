export interface ISource {
  label: string;
  source: string;
}

export interface IPerson {
  uuid: string;
  sources: ISource[];
}

export interface IApiResponse {
  items: IPerson[];
  total: number;
  page?: number;
  size?: number;
  pages?: number;
}