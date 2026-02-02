import React from 'react'
import { useAuth } from '../utils/AuthContext'
import { Link } from 'react-router-dom'
import { LogOut, LogIn } from 'react-feather'
import './header.css'
import { getInitials } from '../pages/SideNav'
const Header = () => {
    const { user, handleLogout } = useAuth()
    const status ='true'
     const userName = 'My Friend'
    return (
       
        <div id="">
    


            <header className="chat-header">
            <div className="center">
                <div className="avatar">{getInitials(userName)}</div>
                    <span className="username">{userName}</span>
                </div>

                <div className="right">
                    
                    <button className="icon">☰</button>
                </div>
            </header>




        </div>
    )
}

export default Header