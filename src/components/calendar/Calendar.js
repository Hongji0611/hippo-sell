import 'react-date-range/dist/styles.css'; // main style file 
import 'react-date-range/dist/theme/default.css'; // theme css file

import { DateRange } from 'react-date-range';
import { useEffect, useState } from 'react';
import useDate from '../../context/hook/useDate';
import { getYYYMMDD } from './DateYYYYMMDD';
import './Calendar.css'

function Calender() {
    const today = new Date();
    const { setStartDate, setEndDate, startDate, endDate } = useDate();

    const [state, setState] = useState([
        {
            startDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 3),
            endDate: today,
            key: 'selection'
        }
    ]);

    const onRangeChange = (item) => {
        setState([item.selection]);
        setStartDate(item.selection.startDate);
        setEndDate(item.selection.endDate);
    };

    useEffect(() => {
        setStartDate(new Date(today.getFullYear(), today.getMonth(), today.getDate() - 3));
        setEndDate(today);
    }, []);

    return (
        <div>
            <DateRange
                showDateDisplay={false}
                editableDateInputs={true}
                onChange={(item) => onRangeChange(item)}
                moveRangeOnFirstSelection={false}
                ranges={state}
            />
            <p className='setDate'>
                설정하신 일자: {getYYYMMDD(startDate)} ~ {getYYYMMDD(endDate)}
            </p>
        </div>
    )

}
export default Calender;