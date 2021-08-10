import './App.css';
import { BrowserRouter as Router, Route, Switch, useHistory } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Home from './containers/Home.js';
import NavBar from './components/NavBar';
import Signup from './components/Signup';
import Login from './components/Login';
import Menu from './containers/Menu';
import Order from './containers/Order';
import OrderComplete from './containers/OrderComplete';
import SavedOrders from './containers/SavedOrders';

function App() {

  const [loggedIn, setLoggedIn] = useState(false)
  const [orderId, setOrderId] = useState("")
  const [user, setUser] = useState({})
  const [errors, setErrors] = useState([])
  const [order, setOrder] = useState([])
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
    fetch("/last")
    .then(res => res.json())
    .then(data => {
      setOrderId(data.id)
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
      <NavBar user={user} loggedIn={loggedIn} login={login} logout={logout} />
      <Switch>
        <Route exact path="/" component={Home} loggedIn={loggedIn}/>
        <Route exact path="/signup" render={routerProps => <Signup {...routerProps} errors={errors} user={user} loginUser={login} logout={logout} />} />
        <Route exact path="/login" render={routerProps => <Login {...routerProps} loginUser={login} logout={logout} />} />
        <section>
          <Route exact path="/menu" render={routerProps => <Menu {...routerProps} loggedIn={loggedIn} id={orderId} />} />
          <Route exact path="/order" render={routerProps => <Order {...routerProps} id={orderId} order={order} />} />
          <Route exact path="/order_complete" component={OrderComplete} />
          <Route exact path="/saved_orders" component={SavedOrders} />
        </section>
      </Switch>
    </div>
  );
}

export default App;
