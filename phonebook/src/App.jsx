import { useState } from 'react'

const People = ({name, phoneNum}) => <p>{name} {phoneNum}</p>

const InputBox = ({text, value, onChange}) => {
  return <div>{text}<input value={value} onChange={onChange}/></div>
}

const PersonForm = ({onSubmit, nameValue, numValue, nameChange, numChange}) => {
  return (
    <>
    <form onSubmit={onSubmit}>
      <InputBox text='name: ' value={nameValue} onChange={nameChange}/>
      <InputBox text='number: ' value={numValue} onChange={numChange}/>
      <div><button type="submit">add</button></div>
    </form>
  </>
  )
}

const Persons  = ({array}) => {
  return (
    <ol>
    {array.map(item => <People key={item.id} name={item.name} phoneNum={item.phoneNum}/>)}
    </ol>
  )
}

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
      <InputBox text={'filter shown with: '} value={nameFilter} onChange={handleFilterName}/>
      <h2>Add New Entry</h2>
      <PersonForm onSubmit={addName} nameValue={newName} numValue={newNumber} nameChange={handleSubmitNewName} numChange={handleSubmitNewNumber}/>
      <h2>Numbers</h2>
      <Persons array={peopleToShow}/>
    </div>
  )
}

export default App