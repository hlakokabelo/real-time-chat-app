import { createContext, useState, useEffect, useContext } from "react";



const AuthContext = createContext();

export const useAuthContext = () => AuthContext
export const AuthProvider = ({ children }) => {
    //makes certain we load a page before rendering, complete loading data then display
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(false)

    const contextData = { user ,handleUserLogin}
    useEffect(() => {
        setLoading(false)
    }, [])



    

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
            navigate("/");
        } catch (error) {
            console.error(error);
        }
    };
    return (<AuthContext.Provider value={contextData}>
        {loading ? <p>...loading</p> : children}
    </AuthContext.Provider>)
}





