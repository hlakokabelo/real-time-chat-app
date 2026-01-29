import React, { useEffect, useState } from 'react'
import { useAuth } from '../hooks/Auth'
import { useNavigate } from 'react-router-dom';
const LoginPage = () => {

    const { user, handleUserLogin } = useAuth();
    const navigate = useNavigate()

    const [credentials, setCredentials] = useState({ email: '', password: '' })

    useEffect(() => {
        if (user) {
            navigate('/')
        }
    }, [])

    const handleInputChange = (e) => {
        let name = e.target.name
        let value = e.target.value

        // [name] informs react that the name is dynamic.
        setCredentials({ ...credentials, [name]: value })
       
    }

    return (
        <div className="auth--container">
            <div className="form--wrapper">
                <form onSubmit={(e) => handleUserLogin(e, credentials)}>

                    <div className="field--wrapper">
                        <label htmlFor="email">Email</label>
                        <input
                            type='email'
                            required
                            name='email'
                            placeholder='Enter your email...'
                            value={credentials.email}
                            onChange={handleInputChange}
                        />

                    </div>
                    <div className="field--wrapper">
                        <label htmlFor="password">password</label>
                        <input
                            type='password'
                            required
                            name='password'
                            placeholder='Enter your password...'
                            value={credentials.password}
                            onChange={handleInputChange}
                        />

                    </div>
                    <div className="field--wrapper">
                        <input type="submit" value='login' className="btn btn--lg btn--main"
                        />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginPage
