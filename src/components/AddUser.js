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
            <form className="addUserForm form-control-sm" onSubmit={handleUserSubmit} aria-describedby="passwordHelpBlock">
                <label htmlFor="email">Email:</label>
                <input className="addUserBox" type="text" name="email" value={user.email} onChange={handleUserChange}/>
                <br/>
                <br/>
                <label htmlFor="password">Password:</label>
                <input className="addUserBox" type="password" name="password" value={user.password} onChange={handleUserChange}/>
                <div id="passwordHelpBlock" class="form-text">Your password must be 8-1000 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji.</div>
                <br/>
                <input className="addUserButton button btn-outline-dark btn" type="submit"/>
            </form>
        </>
    )
}

export default AddUser;
