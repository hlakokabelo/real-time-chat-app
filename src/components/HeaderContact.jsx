import React from 'react'
import { useAuth } from '../utils/AuthContext'
import { Link } from 'react-router-dom'
import { LogOut, LogIn } from 'react-feather'
import './header.css'
import { getInitials } from '../pages/SideNav'
const Header = () => {
    const { user, handleLogout, talkingWith } = useAuth()
    const status = 'true'
    return (

        <div id="">
            <header className="chat-header">
                <div className="center">
                    <div className="avatar">{talkingWith ? getInitials(talkingWith) : 'start chat'}</div>
                    <span className="username">{talkingWith}</span>
                </div>
                <div className="right">
                    <button className="icon">☰</button>
                </div>
            </header>
        </div>
    )
}

export default Header