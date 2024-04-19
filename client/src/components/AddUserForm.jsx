import { useState } from "react"
import axios from 'axios'

const AddUserForm = () => {

    const [newUser, setNewUser] = useState({name:"", email:"", age:0})

    async function submitHandler(e){
        e.preventDefault()

        const formData = new FormData()
        formData.append("name",  newUser.name)
        formData.append("age", newUser.age)
        formData.append("email", newUser.email)

        console.log("FormData value")
        for(let [key, values] of formData.entries()){
            console.log(`${key}: ${values}`)
        }

        try {
        const response = await axios.post("http://localhost:8000/api/users",formData )
            // const response = await fetch("http://localhost:8000/api/users",{
            //     method: "POST",
            //     headers: {'Content-type':'application/json'},
            //     body: JSON.stringify(newUser)
            // })

            if(!response.ok){
                throw new Error(`Network response was not ok ${response.status}`)
            }

            const data = await response.json()
            console.log(`user addded ${data}`)
            setNewUser({name:"", email:"", age:0})
            //updateUsersList()

        } catch(err) {
            console.error(`Some problems with your fetch operation: ${err.message}`)
        }


    }


    return (
        <>
            <h5>Add a new user</h5>
            <form onSubmit={submitHandler}>
                <input  type="text" 
                        placeholder="wprowadź imię użytkownika" 
                        value={newUser.name}
                        onChange={ e => setNewUser({...newUser, name: e.target.value})}/>
            
                <input  type="email" 
                        placeholder="email" 
                        value={newUser.email}
                        onChange={ e =>setNewUser({...newUser, email: e.target.value})}/>

                <input  type="number" 
                        placeholder="wiek" 
                        value={newUser.age}
                        onChange={ e => setNewUser({...newUser, age: e.target.value})}/>
                <button type="submit">Add user</button>
            </form>
        </>
    )   
}

export default AddUserForm 