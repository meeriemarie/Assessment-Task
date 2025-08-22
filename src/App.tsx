import { useState } from 'react';
import './App.css';
import type { IApiResponse, IPerson } from './types/Person';

function App() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [persons, setPersons] = useState<IPerson[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  //const API_BASE_URL = 'https://pfp-api.acdh-ch-dev.oeaw.ac.at/persons';

  const handleSearch = async (event: React.FormEvent) => {
    event.preventDefault();

    // Do nothing if the search term is empty or just whitespace
    if (!searchTerm.trim()) {
      setPersons([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // const url = `${API_BASE_URL}&page=1&size=100?label=${encodeURIComponent(searchTerm)}`;
      const response = await fetch('/public/data/persons.json');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      // const data: IApiResponse = await response.json();
      const data = await response.json();
      console.log("API Response:", data);
      setPersons(data.items);
      
    } catch (err) {
      console.error("Failed to fetch persons:", err);
      setError("Failed to load data. Please check your network or try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Prosopographical Research Platform Search</h1>
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

      {loading && <p>Loading persons...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      <div style={{ marginTop: '20px' }}>
        {persons.length > 0 ? (
          <ul>
            {persons.map((person) => (
              <li key={person.uuid} style={{ marginBottom: '15px', border: '1px solid #ccc', padding: '10px' }}>
                {/* As no top-level label is returned, use the label from the first source */}
                <h3>{person.sources[0]?.label || 'No Label Available'} (UUID: {person.uuid})</h3>
                {person.sources && person.sources.length > 0 && (
                  <div>
                    <h4>Sources:</h4>
                    <ul>
                      {person.sources.map((source, index) => (
                        <li key={index}>
                          <a href={source.source} target="_blank" rel="noopener noreferrer">{source.label}</a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>
        ) : (
          !loading && !error && searchTerm.trim() && <p>No persons found for "{searchTerm}".</p>
        )}
        {!loading && !error && !searchTerm.trim() && <p>Start typing to search for persons.</p>}
      </div>
    </div>
  );
}

export default App;