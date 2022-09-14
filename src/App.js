import './App.css'
import {useState, useEffect} from 'react'
import React from 'react'
import axios from 'axios'
import './App.css';
import Edit from './components/Edit'



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
    {products.map((item) => {
      return (
        <div key = {item.id}>
          <img src = {item.image} />
          <h4> Name: {item.name}</h4>
          <h6> Description: {item.description} </h6>
          <h4> Price: {item.price} </h4>
          <h5> Item Type: {item.itemType} </h5>
        </div>
      )
    })}

    </>
  )
}




export default App;
