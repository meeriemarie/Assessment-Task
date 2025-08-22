import type { IPerson } from "../types/Person";

interface PersonCardProps {
    person: IPerson;
}

const PersonCard: React.FC<PersonCardProps> = ({ person }) => {
    const displayLabel = person.sources[0]?.label || 'No label available';

    return (
        <div className='font-body border-2 border-solid p-4 mb-4 max-w-2xl' >
            <h3 className='text-xl font-semibold'> {displayLabel} </h3>
            <p> UUID: {person.uuid} </p>
            {person.sources && person.sources.length > 0 && (
                <div>
                    <h4 className='text-lg font-semibold'> Sources: </h4>
                    <ul>
                        {person.sources.map((source, index) => (
                            <li key={index}>
                                <a href={source.source} target="_blank" rel="noopener noreferrer"> {source.label} </a>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}

export default PersonCard;