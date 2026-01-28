import React, { useEffect, useState } from 'react'
import { db, clientCred } from '../appwriteConfig'
import { deleteMessage, getMessages, sendMessage } from '../components/RoomComponent'
import { ID } from 'appwrite'
import { Trash2 } from 'react-feather'

const Room = () => {


    const [messages, setMessages] = useState([])
    const [messageBody, setMessageBody] = useState('')
    useEffect(() => {
        handleGetMessages()
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
            body: messageBody,
        }
        const response = await sendMessage(payload);
        setMessages(prevState => [response, ...messages])
        setMessageBody('')
    }
    const handleOnchage = (e) => {
        setMessageBody(e.target.value)
    }


    const handleDeleteMessage = async($id) => {
         deleteMessage($id)
        setMessages(prevState=>messages.filter(msg =>msg.$id!==$id))
    }

    return (
        <main className='container'>
            <div >
                <form onSubmit={handleSubmit} id="messages--form">
                    <div>
                        <textarea required
                            maxLength='1000'
                            placeholder='msg'
                            value={messageBody}
                            onChange={(e) => handleOnchage(e)}></textarea>
                    </div>
                    <div className='send-btn--wrapper'>
                        <input className='btn btn--secondary' type="submit" value="Send" />
                    </div>


                </form>
                <div className="room-container">
                    {messages.map(message => (
                        <div className='message--wrapper' key={message.$id}>

                            <div className='message--header'>
                                <small className='message-timestamp'>{message.$createdAt}</small>
                                <Trash2 onClick={() => handleDeleteMessage(message.$id)} />
                            </div>
                            <div className='message--body'>
                                <span> {message.body}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    )
}

export default Room
