import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import '../App.css'

const NavBar = (props) => {

    const linkStyle = {
        width: '100px',
        margin: '0 6px 6px',
        TextDecoration: 'none',
        color: 'black',
        align: 'center',
        position: 'relative'
    }

    
    if (props.loggedIn){
        return (
            <div>
                <h1>Hello {props.user.name}</h1>
                <button onClick={props.logout}>Logout</button>
                <NavLink to="/saved_orders">
                    <button>Saved Orders</button>
                </NavLink>
                <hr/>
                
                <NavLink to="/menu">
                    <button className={"this"}>Menu</button>
                </NavLink>
            </div>
        )
    } else {
        return (
            <div>
                <br/>
                <NavLink to="/signup" style={linkStyle}>
                    Signup
                </NavLink>
                <NavLink to="/login" style={linkStyle}>
                    Login
                </NavLink>
                <NavLink to="/menu" style={linkStyle}>
                    Menu
                </NavLink>
                <NavLink to="/order" style={linkStyle}>
                    Your Order
                </NavLink>
                <hr/>
            </div>
        )
    }
}

export default NavBar