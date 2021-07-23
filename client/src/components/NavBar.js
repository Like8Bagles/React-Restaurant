import React from 'react'
import { NavLink, Link } from 'react-router-dom'

const Navigation = (props) => {
    
    if (props.loggedIn){
        return (
            <div>
                <h1>Hello {props.user.name}</h1>
                <hr/>
                <button onClick={props.logout}>Logout</button>
                <Link to="/shows">
                    <button>Shows</button>
                </Link>
            </div>
        )
    } else {
        return (
            <div>
                <br/>
                <Link to="/signup">
                    <button>Signup</button>
                </Link>
                <br/>
                <Link to="/login">
                    <button>Login</button>
                </Link>
                <hr/>
            </div>
        )
    }
}

export default Navigation