import { useState } from "react";
 
const AddUser = (props) => {
    let emptyUser = {email: '', password: ''}

    let [user, setUser = useState] = useState(emptyUser)
    
    const handleUserChange = (e) => {   
      setUser({...user, [e.target.name]: e.target.value})
    }

    const handleUserSubmit = (e) => {
      e.preventDefault()
      props.handleNewUser(user)
      setUser(emptyUser)
    }

    return (
        <>
            <form className="addUserForm" onSubmit={handleUserSubmit}>
                <label htmlFor="email">Email:</label>
                <input className="addUserBox" type="text" name="email" value={user.email} onChange={handleUserChange}/>
                <br/>
                <br/>
                <label htmlFor="password">Password:</label>
                <input className="addUserBox" type="password" name="password" value={user.password} onChange={handleUserChange}/>
                <br/>
                <br/>
                <input className="addUserButton" type="submit"/>
            </form>
        </>
    )
}

export default AddUser;