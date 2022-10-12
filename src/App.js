import './App.css'
import {useState, useEffect, isValidElement} from 'react'
import React from 'react'
import axios from 'axios'

import Edit from './components/Edit'
import New from './components/New'
import Footer from './components/Footer'

import Login from './components/Login'
import AddUser from './components/AddUser'



const App = () => {
  const [products, setProducts] = useState([])
  const [loginHeader, setLoginHeader] = useState(false)
  const [displayLogin, setDisplayLogin] = useState(false)
  const [show, setShow] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false)
  const [showProduct, setShowProduct] = useState(false)
  const [user, setUser] = useState([])
  const [currentUser, setCurrentUser] = useState([])
  const [newUser, setNewUser] = useState([])




// ========GET PRODUCTS=======

const getProducts = () => {
  axios.get('https://secure-beyond-15495.herokuapp.com/api/products').then(
    (response) => setProducts(response.data),
    (err) => console.error(err),
  ).catch((error) => console.error(error))
}

// ========    CREATE PRODUCTS   =======

const handleCreate = (addItem) => {
  // let nextId = products[products.length - 1].id + 1
  axios.post('https://secure-beyond-15495.herokuapp.com/api/products', addItem)
    .then((response) => {
      // addItem.id = nextId
      setProducts([...products, response.data])
    })
}

// ========    DELETE PRODUCTS   =======

const handleDelete = (deletedItem) => {
  axios.delete('https://secure-beyond-15495.herokuapp.com/api/products/' + deletedItem.id)
  .then ((response) => {
    setProducts (products.filter( item => item.id !== deletedItem.id))
  })
}

// ========    UPDATE PRODUCTS   =======

const handleUpdate = (editItem) => {
  axios
    .put('https://secure-beyond-15495.herokuapp.com/api/products/' + editItem.id, editItem)
    .then((response) => {
      setProducts(products.map((item) => {
        return item.id !== editItem.id ? item : editItem
      }))
    })
}



const handleLogin = (findUser) => {
  axios.put('https://secure-beyond-15495.herokuapp.com/api/useraccount/login' , findUser)
  .then((response) => {
    if (response.data.email == null) {
      alert('Email and Password Do Not Match')
    } else {
      setUser(response.data)
      axios
      .get('https://secure-beyond-15495.herokuapp.com/api/useraccount/' + response.data.id).then((response) => {
        setCurrentUser(response.data)
      })
    setShowProduct(true)
    setLoginSuccess(false)
    console.log(response.data)
    }
  })
}

// ======== DELETE USER AND ALL ASSOCIATED PRODUCTS =======

const handleDeleteUser = () => {
  products.filter((deletedProducts) => {
    if(deletedProducts.useraccount == user.id) {
      // console.log(deletedProducts.id)
      axios.delete('https://secure-beyond-15495.herokuapp.com/api/products/' + deletedProducts.id)
      .then ((response) => {
        setProducts (products.filter( item => item.id !== deletedProducts.id))
      })
    }
  })
  axios.delete('https://secure-beyond-15495.herokuapp.com/api/useraccount/' + user.id)
  .then(() => {
    setUser([])
    setShowProduct(false)
    setDisplayLogin(false)
    setLoginHeader(false)
  })
}


const handleNewUser = (addUser) => {
  axios.post('https://secure-beyond-15495.herokuapp.com/api/useraccount', addUser)
  .then(response => {
    setNewUser([...newUser, response.data],
    (err) => console.error(err))
    alert("ACCOUNT CREATED, NOW LOGIN")
  }).catch((error) => alert('Username already taken'))
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
        {loginHeader ? null : <div><h1 className = "techy">TECHY</h1><h4 className="createAnAccount">CREATE AN ACCOUNT IN ORDER TO LIST ITEMS:</h4></div>}
        {displayLogin ? null : <button className = 'button btn-outline-dark btn' onClick={showPage}>Create Account</button>}
        {displayLogin ? null : <button className='button btn-outline-dark btn' onClick={() => {
                showloginAndHideCreate()
              }}>Login</button>}
        {showProduct ? <><button className="button btn-outline-dark btn" onClick={logout}>Log Out</button>
        </> : null}
        <br/>
        <br/>
      </div>
      <div className="container">
              {displayLogin ? <h1 className = "techy">TECHY</h1> : null}
              {showProduct ? <h4>Welcome to Techy, {currentUser.email}!</h4> : null}
              {loginSuccess ? <h2>Log In Below</h2> : null}
      </div>
      <br/>
      <div className = "loginForm">
        {show ? <div><AddUser handleNewUser={handleNewUser} /><hr/></div> : null}
        {loginSuccess ? <Login handleLogin={handleLogin} loginSuccess={loginSuccess} goBack={goBack} /> : null}
        {showProduct ? <div><h4>Add a New Product</h4><New user={user} handleCreate={handleCreate} /></div> : null}
        <br/>
        <div className = "cardDeck actualCards">
        {products.filter((item) => {
          if (item.useraccount == user.id){
            return item
          }
        })
        .map((item) => {
          return (
            <div className = "card mb-3" style={{ width: '30%', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
              <img src={item.image} alt="..."/>
              <div className="row g-0 frontPage">
                  <div className="card-body">
                    <h5 className="card-title">{item.name}</h5>
                    <p className="card-text">{item.description}</p>
                    <p className="card-text">Price: ${item.price}</p>
                    <p className="card-text">Type: {item.itemType}</p>
                        <Edit handleUpdate={handleUpdate} item={item}/>
                        <br/>
                        <button className = "button btn btn-outline-danger" onClick={() => {handleDelete(item)}} value={item.id}>Delete</button>
                  </div>
              </div>
            </div>
          )
        })}</div>

        {showProduct ? null 
        : 
        <div className = "cardDeck actualCards">
          {products.map((item) => {
            return (
              <div className = "card" style={{ width: '30%', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}class="card mb-3">
                <img src={item.image} alt="..."/>
                <div class="row g-0 frontPage">
                    <div class="card-body">
                      <h5 class="card-title">{item.name}</h5>
                      <p class="card-text">{item.description}</p>
                      <p class="card-text">Price: ${item.price}</p>
                      <p class="card-text">Type: {item.itemType}</p>
                    </div>
                  </div>
                </div>
            )
          })}
        </div>
        }
        <br/>
          {showProduct ? <button className="button btn-outline-danger btn" onClick={handleDeleteUser}>Delete Account and All Listed Items</button> : null} 
          </div>
        <Footer/>
    </>
)
}

export default App;