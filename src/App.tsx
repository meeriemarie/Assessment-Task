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

  let message;
  if (loading) {
    message = <p className='text-blue-200'>Loading persons...</p>;
  } else if (error) {
    message = <p className='text-red-600'>Error: {error}</p>;
  } else if (persons.length === 0 && lastSearched.trim() !== '') {
    message = <p className='text-blue-200'>No persons found for "{lastSearched}".</p>;
  } else if (lastSearched.trim() === '') {
    message = <p className='text-blue-200'>Start typing to search for persons.</p>;
  }


  return (
    <div>
      <div className='font-body text-base text-center pt-10 pb-10 bg-sky-900'>
        <h1 className=' text-white font-display text-4xl m-8'>Prosopographical Research Platform Search</h1>
        <SearchBar
          searchTerm={searchTerm}
          onSearch={handleSearch}
          onSearchTermChange={(e) => setSearchTerm(e.target.value)}
        />
        {message}
      </div>
      <ResultList
        persons={persons}
      />
    </div>
  );
}

export default App;