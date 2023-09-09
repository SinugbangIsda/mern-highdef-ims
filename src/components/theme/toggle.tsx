import { useAppSelector } from "../../redux/hooks";

const ThemeToggleButton = () => {
    const theme = useAppSelector((state) => state.theme);
    
    return (
        <input 
            type = "checkbox" 
            className = "toggle bg-white border border-[#49556B]" 
            checked = { theme === "dark" }
            onChange = {() => {}}
        />
    )
};

export default ThemeToggleButton;