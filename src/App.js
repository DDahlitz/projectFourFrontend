import './App.css'
import {useState, useEffect, isValidElement} from 'react'
import React from 'react'
import axios from 'axios'

import Edit from './components/Edit'
import New from './components/New'
import Login from './components/Login'


const App = () => {
  const [users, setUsers] = useState([])
  const [products, setProducts] = useState([])
  const [loginHeader, setLoginHeader] = useState(false)
  const [displayLogin, setDisplayLogin] = useState(false)
  const [show, setShow] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false)
  const [showProduct, setShowProduct] = useState(false)
  const [user, setUser] = useState([])
  const [currentUser, setCurrentUser] = useState([])

const getProducts = () => {
  axios.get('http://localhost:8000/api/products').then(
    (response) => setProducts(response.data),
    (err) => console.error(err),
  ).catch((error) => console.error(error))
}

const handleCreate = (addItem) => {
  let nextId = products[products.length - 1].id + 1
  axios.post('http://localhost:8000/api/products', addItem)
    .then((response) => {
      addItem.id = nextId
      setProducts([...products, response.data])
    })
}

const handleDelete = (deletedItem) => {
  axios.delete('http://localhost:8000/api/products/' + deletedItem.id)
  .then ((response) => {
    setProducts (products.filter( item => item.id !== deletedItem.id))
  })
}

const handleUpdate = (editItem) => {
  axios
    .put('http://localhost:8000/api/products/' + editItem.id, editItem)
    .then((response) => {
      setProducts(products.map((item) => {
        return item.id !== editItem.id ? item : editItem
      }))
    })
}

const handleLogin = (findUser) => {
  axios.put('http://localhost:8000/api/useraccount/login' , findUser)
  .then((response) => {
    if (response.data.username == null) {
      alert('Username and Password Do Not Match')
    } else {
      setUser(response.data)
      axios
      .get('http://localhost:8000/api/useraccount/' + response.data.id).then((response) => {
        setCurrentUser(response.data)
      })
    setShowProduct(true)
    setLoginSuccess(false)
    console.log(response.data)
    }
  })
}

useEffect(() => {
  getProducts()
}, []) 

const showPage = () => {
  setLoginHeader(false)
  setDisplayLogin(false)
  setShow(true)
  setShowProduct(false)
}

const showloginAndHideCreate = () => {
  setDisplayLogin(true)
  setShow(false)
  setLoginHeader(true)
  setLoginSuccess(true)
}

const showProductInput = () => {
  setShowProduct(true)
}

const goBack =() => {
  setLoginHeader(false)
  setDisplayLogin(false)
  setLoginSuccess(false)
}

const logout = () => {
  setUser([])
  setCurrentUser([])
  setShowProduct(false)
  setDisplayLogin(false)
  setLoginHeader(false)
}


  return (
    <>
    <div className = 'container'>
    {loginHeader ? null : <div><h1>TECHY</h1><h2>CREATE AN ACCOUNT</h2></div>}
    {displayLogin ? null : <button className = 'button' onClick={showPage}>Create Account</button>}
    {displayLogin ? null : <button className='button' onClick={() => {
            showloginAndHideCreate()
          } }>Login</button>}
    {showProduct ? <><button className="button-primary" onClick={logout}>Log Out</button>
    </> : null}
    </div>
    <div className="container">
            {displayLogin ? <h2>YOUR TECHY PAGE</h2> : null}
            {showProduct ? <h4>Welcome to Techy, {user.name}!</h4> : null}
            {loginSuccess ? <h5>Log in</h5> : null}
          </div>
      <div className = "loginForm">
        {show ? <div><h3>NEW USER COMPONENT HERE</h3><hr/></div> : null}
        {loginSuccess ? <Login handleLogin={handleLogin} loginSuccess={ loginSuccess} goBack={goBack} /> : null}
        {showProduct ? <New handleCreate={handleCreate} /> : null}
      </div>
      <div>
        {products.map((item) => {
          return (
            <div key = {item.id}>
              <h4> Name: {item.name}</h4>
              <img src = {item.image} />
              <h6> Description: {item.description} </h6>
              <h4> Price: {item.price} </h4>
              <h5> Item Type: {item.itemType} </h5>
              <Edit handleUpdate={handleUpdate} item={item} />
              <button onClick={() => {handleDelete(item)}} value={item.id}>Delete</button>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default App;


