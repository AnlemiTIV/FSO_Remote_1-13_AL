const Persons = ({persons, deleteTarget}) => {
    return (
    <div>
        {persons.map(person =>
        <p key={person.id}>
            {person.name} {person.number}
            <button onClick={() => deleteTarget(person.id, person.name, person.number)}>
                delete
                </button>
                </p>
            )}
            </div>
            )
        }

export default Persons
