import type {IApiResponse} from './types/Person.ts';

const API_BASE_URL = 'api/persons';

export async function fetchPersons(searchTerm: string, page: number = 1): Promise<IApiResponse> {
  const url = `${API_BASE_URL}?page=${page}&size=100&label=${encodeURIComponent(searchTerm)}`;
  const response = await fetch(url);

  if (!response.ok) {
    const errorData = await response.json();
    if (response.status === 422 && errorData.detail) {
      const validationMessages = errorData.detail.map((err: any) => err.msg).join('; ');
      throw new Error(`Validation Error: ${validationMessages}`);
    } else {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  }

  const data: IApiResponse = await response.json();
  return data;
}