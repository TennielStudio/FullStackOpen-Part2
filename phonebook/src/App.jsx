import { useState, useEffect} from 'react'
import axios from 'axios'

const People = ({name, number}) => <p>{name} {number}</p>

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
    {array.map(item => <People key={item.id} name={item.name} number={item.number}/>)}
    </ol>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilter, setNameFilter] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log(response)
        setPersons(response.data)
        console.log('promise fulfilled')
      })
  }, [])

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
        number: newNumber,
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