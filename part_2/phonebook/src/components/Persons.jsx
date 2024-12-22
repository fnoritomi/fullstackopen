const Person = ({person}) => {return (<div>{person.name} {person.number}</div>)}

const Persons = ({personsToShow}) => {
    return (
        <div>
            {personsToShow.map(person => 
              <Person key={person.id} person={person}/>
            )}
        </div>
    )
}

export default Persons