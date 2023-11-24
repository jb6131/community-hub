import { createContext, useContext, useEffect, useState } from 'react';
import auth from './auth';

const UserContext = createContext({});

const UserProvider = ({children}) => {
    const [user, setUser] = useState({})
    useEffect(() => {
        if (auth.getToken())
        setUser({_id: auth.getProfile().data._id, firstName: auth.getProfile().data.firstName, lastName: auth.getProfile().data.lastName, email: auth.getProfile().data.email}) 
    }, [auth.getToken])
    return <UserContext.Provider value={{user}} >
        {children}
    </UserContext.Provider>
}

const UseUserContext = () => {
    return useContext(UserContext)
};

export {UserProvider, UseUserContext}