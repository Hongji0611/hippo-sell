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

    //IsLogin
    const [isLogin, setIsLogin] = useState(false);

    return (
        <AppContext.Provider
            value={{
                user,
                setUser,
                isLogin,
                setIsLogin
            }}>
            {children}
        </AppContext.Provider>
    );
};

export default AppProvider;