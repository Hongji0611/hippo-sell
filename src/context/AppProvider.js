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

    //Calender
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    return (
        <AppContext.Provider
            value={{
                user,
                setUser,
                isLogin,
                setIsLogin,
                startDate,
                setStartDate,
                endDate,
                setEndDate
            }}>
            {children}
        </AppContext.Provider>
    );
};

export default AppProvider;