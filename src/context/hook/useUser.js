import { useContext } from "react"
import AppContext from "../AppContext"

const useUser = () => {
    const {
        user,
        setUser
    } = useContext(AppContext);

    return{
        user,
        setUser
    }
}

export default useUser;