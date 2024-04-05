import { useState } from 'react'

const People = ({name, phoneNum}) => <p>{name} {phoneNum}</p>

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phoneNum: '040-123456', id: 1 },
    { name: 'Ada Lovelace', phoneNum: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', phoneNum: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', phoneNum: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilter, setNameFilter] = useState('')

  const peopleToShow = persons.filter(person => {
      const regex = new RegExp(nameFilter, 'i')
      return regex.test(person.name)
    })

  const addName = (event) => {
    event.preventDefault()

    const duplicateName = persons.some(person => person.name === newName)
    if (duplicateName) {
      alert(`${newName} is already added to phonebook` )
    }
    else {
      const nameObject = {
        name: newName,
        phoneNum: newNumber,
        id: persons.length+1
    }
  
      setPersons(persons.concat(nameObject))
      setNewName('')
      setNewNumber('')
      setNameFilter('')
    }
  }

  const handleSubmitNewName = (event) => {
    setNewName(event.target.value)
  }

  const handleSubmitNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterName = (event) => {
    setNameFilter(event.target.value)
  }
  
  return (
    <div>
      <h2>Phonebook</h2>
      <div>filter shown with: <input value={nameFilter} onChange={handleFilterName}/></div>
      <h2>Add New Entry</h2>
      <form onSubmit={addName}>
        <div>name: <input value={newName} onChange={handleSubmitNewName}/></div>
        <div>number: <input value={newNumber} onChange={handleSubmitNewNumber}/></div>
        <div><button type="submit">add</button></div>
      </form>
      <h2>Numbers</h2>
      <ol>
        {peopleToShow.map(person => <People key={person.id} name={person.name} phoneNum={person.phoneNum}/>)}
      </ol>
    </div>
  )
}

export default App