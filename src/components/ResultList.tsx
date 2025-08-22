// src/components/PersonList.tsx
import type { IPerson } from '../types/Person';
import PersonCard from './PersonCard'; // Import the new component

interface ResultListProps {
    persons: IPerson[];
}

const ResultList: React.FC<ResultListProps> = ({ persons}) => {
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