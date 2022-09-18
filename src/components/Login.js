import {useState, useEffect} from 'react'

const Login = (props) => {
    let emptyUser = {username: '', password: ''}
    const [user, setUser] = useState(emptyUser)

    const handleChange = (event) => {
        setUser({...user, [event.target.name]: event.target.value})
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        props.handleLogin(user)
        setUser({username: '', password: ''})
    }

    return (
        <div className = "container">
            <form className = "loginForm" onSubmit={handleSubmit}>
                <input className="button newInput" placeholder="Email" type="text" name="email" value={user.email} onChange={handleChange}></input>
                <input className="button newInput" placeholder="Password" type="password" name="password" value={user.password} onChange={handleChange}></input>
                <br/>
                <input className='button btn-outline-dark btn loginButton'type="submit"></input>
                {props.loginSuccess ? <button className="button btn-outline-dark btn loginButton" onClick={props.goBack}> Go Back</button> : null}
            </form>
        </div>
    )
}

export default Login