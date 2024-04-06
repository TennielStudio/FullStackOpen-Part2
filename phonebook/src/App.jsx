import { useState, useEffect} from 'react'
import axios from 'axios'
import personService from './services/persons'

const Notification = ({message}) => {
  if (message === null) {
    return null
  }

  return (
    <div className='error'>
      {message}
    </div>
  )
}

const People = ({name, number, handleDelete}) => {
  return (
    <div>
      <p>{name} {number} <button onClick={handleDelete}>delete</button></p>
    </div>
  )
}

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

const Persons  = ({array, handleDelete}) => {

  return (
    <ol>
    {array.map(item => {
    return (
      <People
      key={item.id}
      name={item.name}
      number={item.number}
      handleDelete={() => handleDelete(item.id)}
      />)
    }
    )}
    </ol>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilter, setNameFilter] = useState('')
  const [addedMessage, setAddedMessage] = useState('something happened...')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const peopleToShow = persons.filter(person => {
      const regex = new RegExp(nameFilter, 'i')
      return regex.test(person.name)
    })

  const addName = (event) => {
    event.preventDefault()
    
    const nameObject = {
      name: newName,
      number: newNumber
    }

    const duplicateName = persons.some(person => person.name === newName)
    if (duplicateName) {
      if (confirm(`${newName} is already added to phonebook, replace the old num with new one?` )) {
        const foundPerson = persons.find(person => person.name === newName)
        const changedPersons = {...foundPerson, number: newNumber}

        personService
          .update(foundPerson.id, changedPersons)
          .then(updatedPerson => {
            setPersons(persons.map(person => person.id !== foundPerson.id ? person : updatedPerson))
            setAddedMessage(`Updating ${foundPerson.name}`)

            setTimeout(() => {
              setAddedMessage(null)
            }, 5000)
          })
      }
    }
    else {
    personService
      .create(nameObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        setNameFilter('')

        setAddedMessage(`Adding ${newName}`)

        setTimeout(() => {
          setAddedMessage(null)
        }, 5000)
      })
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

  const deletePerson = (id) => {
    if (confirm('you sure?')) {
      const url = `http://localhost:3001/persons/${id}`
      
      personService
        .deleteItem(id)
        .then((deletedPerson) => {
          const updatedPersons = persons.filter(person => person.id !== deletedPerson.id)
          setPersons(updatedPersons)
        })
    }
  }
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={addedMessage} />
      <InputBox text={'filter shown with: '} value={nameFilter} onChange={handleFilterName}/>
      <h2>Add New Entry</h2>
      <PersonForm onSubmit={addName} nameValue={newName} numValue={newNumber} nameChange={handleSubmitNewName} numChange={handleSubmitNewNumber}/>
      <h2>Numbers</h2>
      <Persons array={peopleToShow} handleDelete={deletePerson}/>
    </div>
  )
}

export default App