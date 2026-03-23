const Persons = ({persons, deleteTarget}) => {
    return (
    <div>
        {persons.map(person =>
        <p className="listed-coloring" key={person.id}>
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
