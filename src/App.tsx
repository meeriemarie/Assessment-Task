import { useState } from 'react';
import './styles/App.css';
import ResultList from './components/ResultList';
import SearchBar from './components/SearchBar'; // Import SearchBar
import { fetchPersons } from './api'; // Import the new API function
import type { IPerson } from './types/Person';

function App() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [lastSearched, setLastSearched] = useState<string>('');
  const [persons, setPersons] = useState<IPerson[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

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
      const data = await fetchPersons(searchTerm);
      setPersons(data.items);
    } catch (err: any) {
      console.error("Failed to fetch persons:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='font-body text-base text-center pt-20'>
      <h1 className='font-display text-4xl m-8'>Prosopographical Research Platform Search</h1>
      <SearchBar
        searchTerm={searchTerm}
        onSearch={handleSearch}
        onSearchTermChange={(e) => setSearchTerm(e.target.value)}
      />
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