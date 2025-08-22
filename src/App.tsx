import { useState } from 'react';
import './styles/App.css';
import ResultList from './components/ResultList';
import SearchBar from './components/SearchBar';
import Pagination from './components/Pagination';
import { fetchPersons } from './api';
import type { IPerson } from './types/Person';

function App() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [lastSearched, setLastSearched] = useState<string>('');
  const [persons, setPersons] = useState<IPerson[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);

  const handleSearch = async (event: React.FormEvent) => {
    event.preventDefault();
    setCurrentPage(1);
    performSearch(searchTerm, 1);
  };

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
      performSearch(lastSearched, page);
    }
  };

  const performSearch = async (term: string, page: number) => {
    if (!term.trim()) {
      setPersons([]);
      setLastSearched('');
      setTotalPages(0);
      return;
    }

    setLoading(true);
    setError(null);
    setLastSearched(term);

    try {
      const data = await fetchPersons(term, page);
      setPersons(data.items);
      setTotalPages(Math.ceil(data.total / 100));
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
      {persons.length > 0 && <ResultList persons={persons} />}
      {totalPages > 1 && <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />}
    </div>
  );
}

export default App;