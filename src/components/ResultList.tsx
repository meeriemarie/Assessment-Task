// src/components/PersonList.tsx
import type { IPerson } from '../types/Person';
import PersonCard from './PersonCard'; // Import the new component

interface ResultListProps {
    persons: IPerson[];
    loading: boolean;
    error: string | null;
    searchTerm: string;
}

const ResultList: React.FC<ResultListProps> = ({ persons, loading, error, searchTerm }) => {
    if (loading) {
        return <p>Loading persons...</p>;
    }

    if (error) {
        return <p style={{ color: 'red' }}>Error: {error}</p>;
    }

    if (persons.length === 0 && searchTerm.trim()) {
        return <p>No persons found for "{searchTerm}".</p>;
    }

    if (persons.length === 0 && !searchTerm.trim()) {
        return <p>Start typing to search for persons.</p>;
    }

    return (
        <div className='flex justify-center items-center min-h-screen'>
            <ul className='flex flex-col items-center mt-10 w-full' >
                {persons.map((person) => (
                    <PersonCard key={person.uuid} person={person} />
                ))}
            </ul>
        </div>
    );
};

export default ResultList;