import './App.css'
import {useState, useEffect} from 'react'
import React from 'react'
import axios from 'axios'

<<<<<<< HEAD
import './App.css';
import axios from 'axios';
import {useState, useEffect}  from 'react';

const App = () => {
  
  return (
    <h1>HEader</h1>
  )
}
export default App;
=======
// import New from './components/New'
// import Edit from './components/Edit'


const App = () => {
  const [users, setUsers] = useState([])
  const [products, setProducts] = useState([])


const getProducts = () => {
  axios.get('http://localhost:8000/api/products').then(
    (response) => setProducts(response.data),
    (err) => console.error(err),
  ).catch((error) => console.error(error))
}



useEffect(() => {
  getProducts()
}, [])

  return (
    <>
    <h1>Header</h1>
    {products.map((product) => {
      return (
        <div key = {product.id}>
          <img src = {product.image} />
          <h4> Name: {product.name}</h4>
          <h6> Description: {product.description} </h6>
          <h4> Price: {product.price} </h4>
          <h5> Item Type: {product.itemType} </h5>
        </div>
      )
    })}

    </>
  )
}




export default App;
>>>>>>> 0716335d417b9c7f93f30bf6eccf18ea1c39bcc9
