import React, { useEffect, useState } from 'react'
import { db, clientCred, client } from '../appwriteConfig'
import { deleteMessage, getMessages, sendMessage } from '../components/RoomComponent'
import { ID, Realtime } from 'appwrite'
import { Trash2 } from 'react-feather'

const Room = () => {


    const [messages, setMessages] = useState([])
    const [messageBody, setMessageBody] = useState('')

    const [dis, setDis] = useState([])
    useEffect(() => {
        handleGetMessages()

        const realtime = new Realtime(client)
        //databases.<DATABASE_ID>.tables.<TABLE_ID>.rows.<ROW_ID>

        const setSubscription = async () => {
            const meth = await realtime.subscribe(`databases.${clientCred.DB_ID}.collections.${clientCred.TABLE_ID_MESSAGES}.documents`,
                res => {

                    console.log(res.events[0])

                    if (res.events[0].includes('create')) {
                       console.log('triger crea')
                        setMessages(prevState => [res.payload, ...prevState])
                    } 
                    if (res.events.in('delete')) {
                       
                       console.log('triger del')
                        setMessages(prevState => prevState.filter(msg => msg.$id !== res.payload.$id))
                    }
                }
            );


            meth.close
        }

        setSubscription()

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
                                <small className='message-timestamp'>
                                    {new Date(message.$createdAt).toLocaleString()}</small>
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
