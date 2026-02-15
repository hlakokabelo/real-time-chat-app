import { createContext, useState, useEffect, useContext } from "react";
import { account } from "../appwriteConfig";
import { useNavigate } from "react-router-dom";
import { ID } from "appwrite";
import { Loader } from "react-feather";



const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    //makes certain we load a page before rendering, complete loading data then display
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(null)
    const [talkingWith, setTalkingWith] = useState('') // stores the current user we are talking to
    const navigate = useNavigate()



    const handleUserLogin = async (e, credentials) => {
        e.preventDefault();
        console.log("CREDS:", credentials);

        try {
            let response = await account.createEmailPasswordSession(
                credentials.email,
                credentials.password
            );

            let accountDetails = await account.get();
            setUser(accountDetails);
            console.log(accountDetails)
            navigate("/");

        } catch (error) {
            console.error(error);
        }
    };

    const handleLogout = async () => {
        const response = await account.deleteSession("current");
        console.log({response})
        await setUser(null);
        navigate("/login");
    };

    const getUserOnLoad = async () => {
        try {
            let accountDetails = await account.get();
            setUser(accountDetails);
        } catch (error) {
            console.warn(error)
        }
        setLoading(false);
    };

    const handleRegister = async (e, credentials) => {
        e.preventDefault();
        console.log("Handle Register triggered!", credentials);

        if (credentials.password1 !== credentials.password2) {
            alert("Passwords did not match!");
            return;
        }

        try {
            let response = await account.create(
                ID.unique(),
                credentials.email,
                credentials.password1,
                credentials.name
            );
            console.log("User registered!", response);



            await account.createEmailPasswordSession(
                credentials.email,
                credentials.password1
            );
            let accountDetails = await account.get();
            setUser(accountDetails);
            navigate("/");
        } catch (error) {
            console.error(error);
        }
    };

    const changeTalkingTo = (newTalk) => {
        //pass user and setConversationID, setEffect by convID
        setTalkingWith(newTalk)
    }

    const contextData = {
        user,
        talkingWith,
        changeTalkingTo,
        handleLogout,
        handleUserLogin,
        handleRegister
    }
    useEffect(() => {
        getUserOnLoad()
    }, [])

    return (<AuthContext.Provider value={contextData}>
        {loading ? <p style={{ textAlign: "center", fontSize: '50px' }}><Loader /></p> : children}
    </AuthContext.Provider>)
}



export const useAuth = () => {
    return useContext(AuthContext)
}

