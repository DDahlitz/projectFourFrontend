import { useState } from "react";

const Edit = (props) => {
  const [item,setItem] = useState({...props.item})

  const handleChange = (e) => {
    setItem({...item, [e.target.name]: e.target.value})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    props.handleUpdate(item)
  }

  return (
    <>
        <details>
            <summary>Edit item</summary>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name:</label>
                <input type="text"  name="name" value={item.name} onChange={handleChange}/>
                <br/>
                <br/>
                <label htmlFor="image">Image:</label>
                <input type="text" name="image" value={item.image} onChange={handleChange}/>
                <br/>
                <br/>
                <label htmlFor="description">Description:</label>
                <input type="text" name="description" value={item.description} onChange={handleChange}/>
                <br/>
                <br/>
                <label htmlFor="price">Price:</label>
                <input type="number" name="price" value={item.price} onChange={handleChange}/>
                <br/>
                <br/>
                <label htmlFor="itemType">Item type:</label>
                <input type="text" name="itemType" value={item.itemType} onChange={handleChange}/>
                <input type="submit" />
            </form>
        </details>
    </>
  )
}

export default Edit