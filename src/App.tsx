import { useState } from 'react';
import './styles/App.css';
import type { IApiResponse, IPerson } from './types/Person';
import ResultList from './components/ResultList';

function App() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [lastSearched, setLastSearched] = useState<string>('');
  const [persons, setPersons] = useState<IPerson[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const API_BASE_URL = 'api/persons';

  const handleSearch = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!searchTerm.trim()) {
      setPersons([]);
      setLastSearched('');
      return;
    }

    setLoading(true);
    setError(null);
    setLastSearched(searchTerm);

    try {
      const url = `${API_BASE_URL}?page=1&size=100&label=${encodeURIComponent(searchTerm)}`;
      const response = await fetch(url);

      if (!response.ok) {
        // Attempt to read the error message from the response body
        const errorData = await response.json();

        if (response.status === 422 && errorData.detail) {
          // If it's a validation error, extract the specific messages
          const validationMessages = errorData.detail.map((err: any) => err.msg).join('; ');
          throw new Error(`Validation Error: ${validationMessages}`);
        } else {
          // For other HTTP errors, use the status code and a generic message
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      }

      const data: IApiResponse = await response.json();
      console.log("API Response:", data);
      setPersons(data.items);

    } catch (err: any) {
      console.error("Failed to fetch persons:", err);
      setError(err.message); // Set the error state with the specific message
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className='font-body text-base text-center pt-20'>
      <h1 className='font-display text-4xl m-8'>Prosopographical Research Platform Search</h1>
      <form onSubmit={handleSearch} className="max-w-md mx-auto mb-4">
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
            </svg>
          </div>
          <input
            type="text"
            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="e.g, Schnitz"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            type="submit"
            className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Search
          </button>
        </div>
      </form>

      <ResultList
        persons={persons}
        loading={loading}
        error={error}
        lastSearched={lastSearched}
      />
    </div>
  );
}

export default App;