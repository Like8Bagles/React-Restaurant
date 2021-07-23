import React, { useState } from 'react'

const Login = (props) => {
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = (e) =>{
        e.preventDefault()
        fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name, 
                password: password,
            })
        }) 
        .then(res => res.json())
        .then(user => props.loginUser(user))
    }

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
                <input 
                    type="submit"
                />
            </form>
        </div>
    )
}

export default Login