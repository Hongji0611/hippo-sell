import { useContext } from "react"
import AppContext from "../AppContext"

const useIsLogin = () => {
    const {
        isLogin,
        setIsLogin
    } = useContext(AppContext);

    return{
        isLogin,
        setIsLogin
    }
}

export default useIsLogin;