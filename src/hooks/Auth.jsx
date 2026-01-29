import { useContext } from "react"
import {useAuthContext} from "../utils/AuthContext"

export const useAuth =()=>{
   
    return useContext(useAuthContext())
}