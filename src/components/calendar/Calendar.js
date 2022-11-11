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
    
    const setOnClickDateBtn = (days) => {
        const clone = new Date();
        clone.setDate(today.getDate() + days)
        setStartDate(clone);
        setState([
            {
                startDate: clone,
                endDate: today,
                key: 'selection'
            }
        ]);
        console.log(startDate)
    }

    return (
        <div>
            <div className='calenderBox'>
                <DateRange
                    showDateDisplay={false}
                    editableDateInputs={true}
                    onChange={(item) => onRangeChange(item)}
                    moveRangeOnFirstSelection={false}
                    ranges={state}
                />
                <div className="dateBox">
                    <p className="dateBtn" onClick={() => {setOnClickDateBtn(-3)}}>3일 전</p>
                    <p className="dateBtn" onClick={() => {setOnClickDateBtn(-7)}}>7일 전</p>
                </div>
            </div>

            <p className='setDate'>
                설정하신 일자: {getYYYMMDD(startDate)} ~ {getYYYMMDD(endDate)}
            </p>
        </div>
    )

}
export default Calender;