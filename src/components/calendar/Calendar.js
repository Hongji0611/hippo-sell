import 'react-date-range/dist/styles.css'; // main style file 
import 'react-date-range/dist/theme/default.css'; // theme css file

import { DateRange } from 'react-date-range';
import { useState } from 'react';
import useDate from '../../context/hook/useDate';

function Calender() {
    const today = new Date();
    const { setStartDate, setEndDate } = useDate();

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
    }

    return (
        <div>
            <DateRange
                showDateDisplay={false}
                editableDateInputs={true}
                onChange={(item) => onRangeChange(item)}
                moveRangeOnFirstSelection={false}
                ranges={state}
            />
        </div>
    )

}
export default Calender;