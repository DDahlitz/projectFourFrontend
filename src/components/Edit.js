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
                <input className="editBox" type="text" name="image" value={item.image} onChange={handleChange}/>
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
                <label htmlFor="itemType">Input type:</label>
                <input className="editBox" type="text" name="inputType" value={item.inputType} onChange={handleChange}/>
                <br/>
                <input className="editButton" type="submit"/> 
            </form>
        </details>
    </>
  )
}

export default Edit