import type { IPerson } from "../types/Person";

interface PersonCardProps {
    person: IPerson;
}

const PersonCard: React.FC<PersonCardProps> = ({ person }) => {
    const displayLabel = person.sources[0]?.label || 'No label available';

    return (
        <div className='font-body border-2 border-solid rounded-xl p-4 mb-4 max-w-xl text-center' >
            <h3 className='text-xl font-semibold'> {displayLabel} </h3>
            <h4 className='text-lg font-semibold' > UUID: </h4>
            <ul>
                <li>{person.uuid}</li>
            </ul>
            {person.sources && person.sources.length > 0 && (
                <div>
                    <h4 className='text-lg font-semibold'> Sources: </h4>
                    <ul>
                        {person.sources.map((source, index) => (
                            <li key={index}>
                                <a href={source.source} target="_blank" rel="noopener noreferrer" className='text-blue-600 dark:text-blue-500 hover:underline'>
                                    {source.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}

export default PersonCard;