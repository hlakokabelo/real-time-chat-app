import { Client, Realtime, TablesDB } from "appwrite";

const clientCred = {
  PROJECT_ID: import.meta.env.VITE_APPWRITE_PROJECT_ID,
  PROJECT_NAME: import.meta.env.VITE_APPWRITE_PROJECT_NAME,
  ENDPOINT: import.meta.env.VITE_APPWRITE_ENDPOINT,
  DB_ID: import.meta.env.VITE_APPWRITE_DB_ID,
  TABLE_ID_MESSAGES: import.meta.env.VITE_APPWRITE_TABLE_ID_MESSAGES,
};

const client = new Client();


client.setEndpoint(clientCred.ENDPOINT).setProject(clientCred.PROJECT_ID);
const db = new TablesDB(client);

export { client, db, clientCred };
