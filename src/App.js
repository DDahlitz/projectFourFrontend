import './App.css'
import {useState, useEffect, isValidElement} from 'react'
import React from 'react'
import axios from 'axios'
import './App.css';
import Edit from './components/Edit'



import New from './components/New'
import Edit from './components/Edit'


const App = () => {
  const [users, setUsers] = useState([])
  const [products, setProducts] = useState([])


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
  axios.delete('http://localhost:8000/api/products/' + editItem.id, editItem)
  .then((response) => {
    setProducts(products.map((item) => {
      return isValidElement.id !== response.data.id ? item : editItem
    }))
  })
}



useEffect(() => {
  getProducts()
}, []) 

  return (
    <>
    <h1>Header</h1>
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
