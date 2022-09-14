import './App.css'
import {useState, useEffect, isValidElement} from 'react'
import React from 'react'
import axios from 'axios'

import Edit from './components/Edit'
import New from './components/New'


const App = () => {
  const [users, setUsers] = useState([])
  const [products, setProducts] = useState([])




// ========GET PRODUCTS=======

const getProducts = () => {
  axios.get('http://localhost:8000/api/products').then(
    (response) => setProducts(response.data),
    (err) => console.error(err),
  ).catch((error) => console.error(error))
}

// ========    CREATE PRODUCTS   =======

const handleCreate = (addItem) => {
  let nextId = products[products.length - 1].id + 1
  axios.post('http://localhost:8000/api/products', addItem)
    .then((response) => {
      addItem.id = nextId
      setProducts([...products, response.data])
    })
}

// ========    DELETE PRODUCTS   =======

const handleDelete = (deletedItem) => {
  axios.delete('http://localhost:8000/api/products/' + deletedItem.id)
  .then ((response) => {
    setProducts (products.filter( item => item.id !== deletedItem.id))
  })
}

// ========    UPDATE PRODUCTS   =======

const handleUpdate = (editItem) => {
  axios.put('http://localhost:8000/api/products/' + editItem.id, editItem)
  .then((response) => {
    setProducts(products.map((item) => {
      return item.id !== editItem.id ? item : editItem
    })) 
  })
}

// ======== CREATE NEW USER =======

const handleNewUser = (addUser) => {
  axios.post('http://localhost:8000/api/useraccount', addUser)
  .then(response => {
    setNewUser([...newUser, response.data],
      (err) => console.error(err))
      alert('Account created, proceed to login with newly created account')
  }).catch((error) => alert('This email is already in use. Please try again with a different email address'))
}


// ======== USER LOGIN =======

const handleLogin = (findUser) => {
  axios.put('http://localhost:8000/api/useraccount/login', findUser)
  .then((response) => {
    if(response.data.email == null) {
      alert('The Email and Password do not match')
    } else {
      setUsers(response.data)
      axios
      .get('http://localhost:8000/api/useraccount/' + response.data.id)
      .then((response) => {
        setCurrentUser(response.data)
      })
      // setShowRecord(true)
      // setLoginSuccess(false)
      // console.log(response.data)
    }
  })
}

// ======== DELETE USER AND ALL ASSOCIATED PRODUCTS =======

const handleDeleteUser = () => {
  products.filter((deletedProducts) => {
    if(deletedProducts.email == users.email) {
      // console.log(deletedProducts.id)
      axios.delete('http://localhost:8000/api/products/' + deletedProducts.id)
    }
  })
  axios.delete('http://localhost:8000/api/useraccount/' + users.id)
  // .then(() => {
  //   setUsers([])
  //   setCurrentUser([])
  //   setShowRecord(false)
  //   setShowLogin(false)
  //   setLoginHeader(false)
  // })
}








useEffect(() => {
  getProducts()
}, []) 


  return (
    <>
    <h1>Techy</h1>
    <h2>An application to sell used tech appliances</h2>
    <h3> Create and Account</h3>


    <button> Login </button>
    <button> Logout </button>
    




    <New handleCreate={handleCreate} />
    <div>
    {products.map((item) => {
      return (
        <div key = {item.id}>
          <img src = {item.image} />
          <h4> Name: {item.name}</h4>
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
