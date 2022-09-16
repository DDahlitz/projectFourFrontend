import {useState} from 'react'

const New = (props) => {
    let emptyItem = {name: '', image: '', description: '', price: '', itemType: '' }
    const [item, setItem] = useState(emptyItem)

    const handleChange = (event) => {
        setItem({...item, [event.target.name]: event.target.value})
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        props.handleCreate(item)
        item.useraccount = props.user.id
        setItem({name: '', image: '', description: '', price: '', itemType: '', useraccount:'' })
    }

    return (
        <>
        <form className="newForm" onSubmit={handleSubmit}>
            <div className='hidden'>
                {item.useraccount = props.user.id}
            </div>
            <label htmlFor="name">Name: </label>
            <input className='newBox' type="text" name="name" value={item.name} onChange={handleChange} />
            <br />
            <br />
            <label htmlFor="image">Image: </label>
            <input className='newBox' type="text" name="image" value={item.image} onChange={handleChange} />
            <br />
            <br />
            <label htmlFor="description">Description: </label>
            <input className='newBox' type="text" name="description" value={item.description} onChange={handleChange} />
            <br />
            <br />
            <label htmlFor="price">Price: </label>
            <input className='newBox' type="number" name="price" value={item.price} onChange={handleChange} />
            <br />
            <br />
            <label htmlFor="itemType">Item Type: </label>
            <input className='newBox' type="text" name="itemType" value={item.itemType} onChange={handleChange}/>
            <input className='newButton' type="submit"/>
      </form>
    </>
    )
}

export default New

