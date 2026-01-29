import { createContext, useState, useEffect } from "react";


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    //makes certain we load a page before rendering, complete loading data then display
    const [loading, setLoading] = useState(true)
    const { useer, setUser } = useState(null)
    const contextData = {}

    return
    <AuthContext.Provider value={contextData}>
        {loading ? <p>...loading</p> : children}
    </AuthContext.Provider>
}


//hook
export const useAuth =()=>{

}


