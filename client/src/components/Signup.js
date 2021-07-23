import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

const Signup = (props) => {
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [confirmation, setConfirmation] = useState("")
    const [errorsList, setErrorsList] = useState([])
    const history = useHistory()

    const handleSubmit = (e) =>{
        e.preventDefault()
        fetch("/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name, 
                password: password, 
                password_confirmation: confirmation
            })
        }) 
        .then(res => res.json())
        .then(user => {
            if (user.errors) {
                console.log(user.errors)
                setErrorsList(user.errors)
            } else {
            props.loginUser(user)}
            }
        )
    }

    const error = errorsList.map(e => <li>{e}</li>)

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>Name:  </label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)} 
                />
                <br/>
                <label>Password:  </label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <br/>
                <label>Re-enter Password:  </label>
                <input 
                    type="password"
                    id="confirmation"
                    value={confirmation}
                    onChange={(e) => setConfirmation(e.target.value)}
                />
                <br/>
                <input 
                    type="submit"
                />
                {error}
            </form>
        </div>
    )
}

export default Signup