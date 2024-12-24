const Person = ({person, deletePerson}) => {
    return (
        <div>{person.name} {person.number} <button onClick={deletePerson}>delete</button></div>
    )
}

const Persons = ({personsToShow, deletePerson}) => {
    return (
        <div>
            {personsToShow.map(person => 
              <Person key={person.id} person={person} deletePerson={() => deletePerson(person.id)}/> 
            )}
        </div>
    )
}

export default Persons