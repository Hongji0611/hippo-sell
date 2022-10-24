import React, {useState} from 'react';
import AppContext from './AppContext';

const AppProvider = ({children}) => {
    // User
    const [user, setUser] = useState({
        id: "",
        pw: "",
        store: "",
        name: ""
    });

    return (
        <AppContext.Provider
            value={{
                user,
                setUser
            }}>
            {children}
        </AppContext.Provider>
    );
};

export default AppProvider;