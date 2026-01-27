import {Client} from 'appwrite'
const VITE_APPWRITE_PROJECT_ID = process.env.VITE_APPWRITE_PROJECT_ID
const VITE_APPWRITE_PROJECT_NAME =process.env.VITE_APPWRITE_PROJECT_NAME
const VITE_APPWRITE_ENDPOINT = process.env.VITE_APPWRITE_ENDPOINT
        

const client = new Client();

client.setEndpoint("https://nyc.cloud.appwrite.io/v1").setProject("697809ec000b80ccd480");


export default client;