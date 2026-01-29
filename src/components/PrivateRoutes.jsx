import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../utils/AuthContext'


const PrivateRoutes = () => {


    // returns use defined in contextData obj
    const {user} = useAuth()
    return (
        <div>
            {user ? <Outlet /> : <Navigate to='/login' />}
        </div>
    )
}

export default PrivateRoutes
