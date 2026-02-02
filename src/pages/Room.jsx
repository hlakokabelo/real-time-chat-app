import React, { useEffect, useState } from 'react'
import { db, clientCred, client } from '../appwriteConfig'
import { deleteMessage, getMessages, sendMessage } from '../components/RoomComponent'
import { Realtime, Permission, Role } from 'appwrite'
import { Trash2 } from 'react-feather'
import HeaderContact from '../components/HeaderContact'
import { useAuth } from '../utils/AuthContext'
import './room.css'


const Room = () => {

    const { user } = useAuth()

    const [messages, setMessages] = useState([])
    const [messageBody, setMessageBody] = useState('')

    const [dis, setDis] = useState([])
    useEffect(() => {
        handleGetMessages()

        const realtime = new Realtime(client)
        //databases.<DATABASE_ID>.tables.<TABLE_ID>.rows.<ROW_ID>
        const subscription = client.subscribe(`databases.${clientCred.DB_ID}.collections.${clientCred.TABLE_ID_MESSAGES}.documents`,
            res => {

                if (res.events[0].includes('create')) {
                    console.log('triger crea')
                    setMessages(prevState => [res.payload, ...prevState])
                }
                if (res.events[0].includes('delete')) {

                    console.log('triger del')
                    setMessages(prevState => prevState.filter(msg => msg.$id !== res.payload.$id))
                }
            }
        );



        return () => subscription()

    }, [])


    const handleGetMessages = async () => {
        const { total, rows } = await getMessages();

        if (rows) {
            setMessages(rows)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        let payload = {
            user_id: user.$id,
            username: user.name,  //because we dont ask for username
            body: messageBody,
        }

        //grunts current user the person to delete and update current message
        const permissions = [
            Permission.write(Role.user(user.$id)),
        ]
        sendMessage(payload, permissions);

        setMessageBody('')
    }
    const handleOnchage = (e) => {
        setMessageBody(e.target.value)
    }


    const handleDeleteMessage = async ($id) => {
        deleteMessage($id)
    }


    const getClassName = (message) => {
        return (message.$permissions.includes(`delete(\"user:${user.$id}\")`) ? '--owner' : '')

    }

    function formatMessageTime(isoTimestamp) {
        const date = new Date(isoTimestamp);
        const now = new Date();

        const diffMs = now - date;
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

        const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const monthNames = [
            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ];

        const pad = (num) => String(num).padStart(2, '0');

        const hours = pad(date.getHours());
        const minutes = pad(date.getMinutes());
        const timeStr = `${hours}:${minutes}`;

        // Same day → just time
        if (diffDays === 0) {
            return timeStr;                     // e.g. "14:35"
        }

        // Yesterday → "Yesterday" + time (Instagram often does this)
        if (diffDays === 1) {
            return `Yesterday ${timeStr}`;      // e.g. "Yesterday 14:35"
        }

        // Within last 7 days → short day name + time
        if (diffDays <= 6) {
            const dayShort = dayNames[date.getDay()];
            return `${dayShort} ${timeStr}`;    // e.g. "Thu 14:35"
        }

        // Older → day month [year if not current] + time
        let datePart = `${date.getDate()} ${monthNames[date.getMonth()]}`;
        if (date.getFullYear() !== now.getFullYear()) {
            datePart += ` ${date.getFullYear()}`;
        }

        return `${datePart}, ${timeStr}`;     // e.g. "23 Jan 2026, 23:05" or "23 Jan, 23:05"
    }


    return (
        <div className='header-room-form'>
            <HeaderContact />
            <div className='container'>
                <div className="room-sub-container">
                    <div className="room--container">
                        {messages.map(message => (
                            <div className={'message--wrapper' + getClassName(message)} key={message.$id}>

                                <div className='message--header'>
                                    <p>
                                        <small className='message-timestamp'>
                                            {formatMessageTime(message.$createdAt)}</small>
                                    </p>

                                    {message.$permissions.includes(`delete(\"user:${user.$id}\")`) && (
                                        <Trash2 className="delete--btn" onClick={() => { deleteMessage(message.$id) }} />

                                    )}
                                </div>
                                <div className={'message--body' + getClassName(message)}>
                                    <span> {message.body}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
            <form onSubmit={handleSubmit} id="messages--form">
                <div className='text-btn-input'>
                    <textarea

                        id='text-area-message'
                        required
                        maxLength='1000'
                        placeholder='msg'
                        value={messageBody}
                        onChange={(e) => handleOnchage(e)}></textarea>
                    <input className='btn btn--secondary' type="submit" value="Send" />

                </div>
            </form></div>
    )
}

export default Room
