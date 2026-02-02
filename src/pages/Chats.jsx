import React from 'react'
import Room from './Room'
import Header from '../components/Header'
import SideNav from './SideNav'
import './chats.css'

const Chats = () => {
    return (
        <div>
            <div className='chat-app'>
                <SideNav />
                <Room />
            </div>
        </div>
    )
}

export default Chats
