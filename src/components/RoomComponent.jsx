import { clientCred, client, db, } from '../appwriteConfig'
import { ID, Query } from 'appwrite'


const sendMessage = async (payload) => {


    try {
        const response = await db.createRow({
            databaseId: clientCred.DB_ID,
            tableId: clientCred.TABLE_ID_MESSAGES,
            rowId: ID.unique(),
            data: payload
        });
        return response;
    } catch (error) {
        return (error)

    }
}

const deleteMessage = async ($id) => {
    try {
        const response = await db.deleteRow({
            databaseId: clientCred.DB_ID
            , tableId: clientCred.TABLE_ID_MESSAGES,
            rowId: $id,
        });
        return response
    } catch (error) {
        return (error)

    }
}

const getMessages = async () => {
    try {

        //total rows
        const { total, rows } = await db.listRows({
            databaseId: clientCred.DB_ID
            , tableId: clientCred.TABLE_ID_MESSAGES,
            queries: [
                Query.orderDesc('$createdAt'),
                Query.limit(16)
            ]
        })

        return { total, rows };
    } catch (error) {
        console.log(error)
    }
}

export { getMessages, sendMessage, deleteMessage }