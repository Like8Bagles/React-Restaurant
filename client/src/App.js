import './App.css';
import { BrowserRouter as Router, Route, Switch, useHistory } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Home from './containers/Home.js';
import Navigation from './components/Navigation';
import Signup from './components/Signup';
import Login from './components/Login';

function App() {

  const [loggedIn, setLoggedIn] = useState(false)
  const [user, setUser] = useState({})
  const [errors, setErrors] = useState([])
  const history = useHistory()

  useEffect(() => {
    fetch('/me')
    .then(res => {
      if (res.ok){
        res.json()
        .then( data => {
          setLoggedIn(true)
          setUser(data)
        })
      }
    })
  }, [])

  const login = (user) => {
    if (!user.errors) {
      setLoggedIn(true)
      setUser(user)
      history.push("/")
    } else {
      setErrors(user.errors)
      history.push('/signup')
    }
  }

  const logout = () => {
    fetch("/logout", {
      method: "DELETE"
    })
    .then(() => {
      console.log("Logged out.")
      setLoggedIn(false)
      console.log(loggedIn)
      setUser({})
    })
    history.push('/')
  }

  return (
    <div className="App">
      <Navigation user={user} loggedIn={loggedIn} login={login} logout={logout} />
      <Switch>
        <Route exact path="/" component={Home} loggedIn={loggedIn}/>
        <Route exact path="/signup" render={routerProps => <Signup {...routerProps} errors={errors} user={user} loginUser={login} logout={logout} />} />
        <Route exact path="/login" render={routerProps => <Login {...routerProps} loginUser={login} logout={logout} />} />
      </Switch>
    </div>
  );
}

export default App;
