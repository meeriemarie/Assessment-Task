import { useState } from 'react';
import './styles/App.css';
import type { IApiResponse, IPerson } from './types/Person';
import ResultList from './components/ResultList';

function App() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [persons, setPersons] = useState<IPerson[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const API_BASE_URL = 'api/persons';

  const handleSearch = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!searchTerm.trim()) {
      setPersons([]);
      return;
    }

    setLoading(true);
    setError(null);

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
     <div className='font-body text-base' style={{ padding: '20px' }}>
      <h1 className='font-display text-2xl'>Prosopographical Research Platform Search</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="e.g., Schnitz"
          style={{ padding: '8px', width: '300px', marginRight: '10px' }}
        />
        <button type="submit" style={{ padding: '8px 15px' }}>Search</button>
      </form>

      <ResultList
        persons={persons}
        loading={loading}
        error={error}
        searchTerm={searchTerm}
      />
    </div>
  );
}

export default App;