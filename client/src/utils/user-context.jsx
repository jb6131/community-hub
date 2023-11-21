import { createContext, useContext, useEffect, useState } from 'react';
import auth from './auth';

const UserContext = createContext({});

const UserProvider = ({children}) => {
    const [user, setUser] = useState({})
    useEffect(() => {
        setUser({_id: auth.getProfile().data._id, firstName: auth.getProfile().data.firstName, email: auth.getProfile().data.email}) 
    }, [])
    return <UserContext.Provider value={{user}} >
        {children}
    </UserContext.Provider>
}

const UseUserContext = () => {
    return useContext(UserContext)
};

export {UserProvider, UseUserContext}