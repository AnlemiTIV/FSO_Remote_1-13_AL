
const PersonForm = ({addName, newName, newNumber, nameHandle, numberHandle}) => {
    return (
    
    <form onSubmit={addName}>
        <div>name: <input value={newName} onChange={nameHandle}/></div>
        <div>number: <input value={newNumber} onChange={numberHandle}/></div>
        <div>
            <button type="submit">add</button>
            </div>
            </form>
            )
        }


export default PersonForm