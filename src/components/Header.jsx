import React from 'react'
import { useAuth } from '../utils/AuthContext'
import { Link } from 'react-router-dom'
import { LogOut, LogIn } from 'react-feather'
import './header.css'
const Header = () => {
    const { user, handleLogout } = useAuth()
    const status ='true'
    return (
        <div id="">
    


            <header className="chat-header">
                <div className="left">
                    <div className="logo">💬</div>
                    <span className="app-name">Whisper</span>
                </div>

                <div className="center">
                    <div className={`status-dot ${status}`}></div>
                    <span className="username">{user.username}</span>
                </div>

                <div className="right">
                    <button className="icon">🔍</button>
                    <button className="icon">☰</button>
                </div>
            </header>




        </div>
    )
}

export default Header