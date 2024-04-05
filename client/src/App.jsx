import { useState } from 'react'
import './App.css'
import AddUserForm from './AddUserForm'

function App() {
  const [usersList, setUsersList] = useState([])

  async function fetchData(){
    console.log("I am fetching")
    try{
      const res = await fetch("http://localhost:8000/api/users", {method: "GET"})
      if(!res.ok){
        throw new Error(`network response was not ok: ${res.status}`)
      }

      const data = await res.json()
      setUsersList(data)

    }catch(err){
      console.log("Error: ", err)
    }

  }

  
  const deleteUser= async (userId)=>{
      const confirmation = window.confirm("Czy chcesz skasować użytkownika?")

      if(!confirmation) return

      try{
        const res = await fetch(`http://localhost:8000/api/users/${userId}`, {method: "DELETE"})
        
        if(!res.ok) throw new Error("Error response is not ok")
        
        fetchData() // odświeżanie widoku

      }catch(err){
        console.log(`There was a problem with deleting the user: ${err.message}`)
      }

  }

  return (
    <>
      <h1>Lista użytkowników</h1>
      <h2>Users:</h2>
      <button onClick={fetchData}>Pobierz dane o użytkownikach</button>
      <ul style={{listStyle:'none'}}>
        {
          usersList.map(user=>{
            return (
            <li key={user._id} onClick={()=>deleteUser(user._id)}>imię: {user.name}, 
                               email:{user.email}, 
                               wiek:{user.age}</li>)
          })
        }
      </ul>
      <AddUserForm />
    </>
  )
}

export default App
