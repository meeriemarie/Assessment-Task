export interface ISource {
  label: string;
  uri: string;
}

export interface IPerson {
  uuid: string;
  label: string;
  sources: ISource[];
}

export interface IApiResponse {
  items: IPerson[];
  total?: number;
  page?: number;
  size?: number; 
}