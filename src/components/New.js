import {useState, useEffect} from 'react'

const New = (props) => {
    let emptyItem = {name: '', image: '', description: '', price: '', itemType: '' }
    const [item, setItem] = useState(emptyItem)

    const handleChange = (event) => {
        setItem({...personalbar, [event.target.name]: event.target.value})
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        props.handleCreate(item)
    }

    return (
        <>
        <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name: </label>
            <input type="text" name="name" value={item.name} onChange={handleChange} />
            <br />
            <br />
            <label htmlFor="image">Image: </label>
            <input type="text" name="image" value={item.image} />
            <br />
            <br />
            <label htmlFor="description">Description: </label>
            <input type="text" name="description" value={item.description} onChange={handleChange} />
            <br />
            <br />
            <label htmlFor="price">Price: </label>
            <input type="number" name="price" value={item.price} onChange={handleChange} />
            <br />
            <br />
            <label htmlFor="itemType">Item Type: </label>
            <input type="text" name="itemType" value={item.itemType} onChange={handleChange}/>
            <input type="submit"/>
      </form>
    </>
    )
}

export default New