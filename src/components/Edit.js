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
            <form className="editForm" onSubmit={handleSubmit}>
                <label htmlFor="name">Name:</label>
                <input className="editBox" type="text"  name="name" value={item.name} onChange={handleChange}/>
                <br/>
                <br/>
                <label htmlFor="image">Image:</label>
<<<<<<< HEAD
                <input className="editBox" type="text" name="image" value={item.image} onChange={handleChange}/>
=======
                <input type="text" name="image" value={item.image} onChange={handleChange}/>
>>>>>>> 519cfe620ac820250f111725e556b7312e36f88e
                <br/>
                <br/>
                <label htmlFor="description">Description:</label>
                <input className="editBox" type="text" name="description" value={item.description} onChange={handleChange}/>
                <br/>
                <br/>
                <label htmlFor="price">Price:</label>
                <input className="editBox" type="number" name="price" value={item.price} onChange={handleChange}/>
                <br/>
                <br/>
<<<<<<< HEAD
                <label htmlFor="itemType">Input type:</label>
                <input className="editBox" type="text" name="inputType" value={item.inputType} onChange={handleChange}/>
                <br/>
                <input className="editButton" type="submit"/> 
=======
                <label htmlFor="itemType">Item type:</label>
                <input type="text" name="itemType" value={item.itemType} onChange={handleChange}/>
                <input type="submit" />
>>>>>>> 519cfe620ac820250f111725e556b7312e36f88e
            </form>
        </details>
    </>
  )
}

export default Edit