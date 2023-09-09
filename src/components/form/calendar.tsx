import { useState } from "react";
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { CalendarInputProps } from "../../interfaces";

const CalendarInput = ({
    value,
    onChange
}: CalendarInputProps) => {
    const initialValue = value ? new Date(value) : undefined;

    const [ selected, setSelected ] = useState<Date | undefined>(initialValue);

    const handleDayClick = (date: Date) => {
        setSelected(date);
        onChange(date);
    };

    return (
        <div className="w-full flex flex-col justify-center items-center">
            <DayPicker
                mode = "single"
                selected = { selected }
                onSelect = { date => {
                    setSelected(date);
                    onChange(date);
                }}
                onDayClick = { handleDayClick }
                className = "space-y-4 bg-white shadow-2xl dark:bg-[#363D4C] dark:shadow-none text-black dark:text-white rounded-lg p-4"
                modifiersClassNames = {{
                    selected: "bg-red-500 text-white"
                }}
                required
            />
        </div>
    );
};

export default CalendarInput;