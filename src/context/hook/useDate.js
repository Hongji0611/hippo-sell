import { useContext } from "react"
import AppContext from "../AppContext"

const useDate = () => {
    const {
        startDate,
        setStartDate,
        endDate,
        setEndDate
    } = useContext(AppContext);

    return {
        startDate,
        setStartDate,
        endDate,
        setEndDate
    }
}

export default useDate;