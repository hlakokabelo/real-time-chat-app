import React, { useEffect, useState } from 'react'
import { db, clientCred, client } from '../appwriteConfig'
import { deleteMessage, getMessages, sendMessage } from '../components/RoomComponent'
import { Realtime } from 'appwrite'
import { Trash2 } from 'react-feather'
import Header from '../components/Header'
import { useAuth } from '../utils/AuthContext'

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
        sendMessage(payload);

        setMessageBody('')
    }
    const handleOnchage = (e) => {
        setMessageBody(e.target.value)
    }


    const handleDeleteMessage = async ($id) => {
        deleteMessage($id)
    }

    return (
        <main className='container'>
            <div >
                <Header />
                <form onSubmit={handleSubmit} id="messages--form">
                    <div>
                        <textarea

                            id='text-area-message'
                            required
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
                                <p>
                                    {message?.username?
                                        <span>{message.username}</span> :
                                        <span>anonymous user</span>}

                                    <small className='message-timestamp'>
                                        {new Date(message.$createdAt).toLocaleString()}</small>
                                </p>
                                
                                <Trash2 className='delete--btn' onClick={() => handleDeleteMessage(message.$id)} />
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
