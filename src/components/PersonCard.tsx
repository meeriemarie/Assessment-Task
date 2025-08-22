import React from "react";
import type { IPerson } from "../types/Person";

interface PersonCardProps {
    person: IPerson;
}

const PersonCard: React.FC<PersonCardProps> = ({ person }) => {
    const displayLabel = person.sources[0]?.label || 'No label available';

    return (
        <li style={{ marginBottom: '15px', border: '1px solid #ccc', padding: '10px' }} >
            <h3> {displayLabel} </h3>
            <li> UUID: {person.uuid} </li>
            {person.sources && person.sources.length > 0 && (
                <div>
                    <h4> Sources: </h4>
                    <ul>
                        {person.sources.map((source, index) => (
                            <li key={index}>
                                <a href={source.source} target="_blank" rel="noopener noreferrer"> {source.label} </a>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </li>
    )
}

export default PersonCard;