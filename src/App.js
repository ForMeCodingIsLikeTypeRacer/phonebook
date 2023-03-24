import { useState, useEffect } from 'react'
import axios from 'axios'
import postPerson from './modules/postPerson';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [newFilter, setNewFilter] = useState('');

  useEffect(() => {
    console.log('effect');
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled');
        setPersons(response.data);
      })
  }, [])
  console.log('render', persons.length, 'notes')

  const addName = (event) => {
    event.preventDefault();

    const personList = persons.map(person => person);
    var existingPersonId;
    var existingPersonIndex;
    
    var alreadyExists = false;
    for(var i = 0; i < personList.length; i++) {
      if(newName === personList[i].name) {
        alreadyExists = true;
        existingPersonId = personList[i].id;
        existingPersonIndex = i;
      }
    }
    
    if(alreadyExists === false) {
      const personObject = {
        name: newName,
        number: newNumber,
        id: personList.length + 1
      }
      setPersons(persons.concat(personObject));
      postPerson.postPersonFunc(personObject)
      
    } else {
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`) === true) {
        const personObject = {
          name: newName,
          number: newNumber,
          id: existingPersonId
        }
        const updatedPersons = [
          ...persons.slice(0, existingPersonIndex), // Copy the elements before the updated person
          { ...persons[existingPersonIndex], number: newNumber }, // Create a new object with the updated number property
          ...persons.slice(existingPersonIndex + 1) // Copy the elements after the updated person
        ];
        setPersons(updatedPersons);
        postPerson.updatePersonFunc(existingPersonId,personObject);
      }
    }
    setNewName('');
    setNewNumber('');
  }

  const deleteName = (person) => {
    if(window.confirm(`Delete ${person.name} ?`) === true) {
      postPerson.deletePersonFunc(person);
      setPersons(persons.filter(p => p.id !== person.id));
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  }

  const handleFilterchange = (event) => {
    setNewFilter(event.target.value);
  }

  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(newFilter.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with <input value={newFilter} onChange={handleFilterchange} />
      </div>
      <h2>add a new</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
          <br />
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul style={{listStyle: 'none', padding: 0, margin: 0} }>
        {
          filteredPersons.map(person => 
            <li key={person.id} >{person.name} {person.number} <button onClick={() => deleteName(person)}>delete</button></li>
          )
        }
      </ul>
    </div>
  )
}

export default App
