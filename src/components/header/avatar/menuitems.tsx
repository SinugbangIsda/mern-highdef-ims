import { FaAngleRight } from "react-icons/fa";
import Avatar from "react-avatar";
import ThemeToggleButton from "../../theme/toggle";
import { useToast } from "../../../hooks/useToast";
import { AvatarMenuItemsProps } from "../../../interfaces";

const AvatarMenuItems = ({
    firstname,
    lastname,
    email_address,
    menu_items,
    logout
}: AvatarMenuItemsProps) => {
    const { showSuccess }  = useToast();
    return (
        <div
            tabIndex = { 0 } 
            className = "dropdown-content right-0 mt-2 z-[1] rounded-lg bg-white dark:bg-[#11151C] border border-[#C3C9D] dark:border-[#30363D] shadow-2xl dark:shadow-none overflow-auto w-60 md:w-full">
            <div className = "flex flex-col items-center w-full p-4 space-y-4">
                <Avatar 
                    name = { firstname + " " + lastname }
                    maxInitials = { 2 }
                    round = { true }
                    size = "45"
                    color = "#191D22"
                    fgColor = "white"
                />
                <div className = "flex flex-col items-center">
                    <span className = "text-[#293149] dark:text-[#C0C1C4] text-xs sm:text-sm md:text-md">
                        { firstname + " " + lastname }
                    </span>
                    <span className = "text-[#C5C9D4] dark:text-[#6D7586] text-[8px] sm:text-xs md:text-sm">
                        { email_address }
                    </span>
                </div>
                <div className = "w-full space-y-1">
                    { menu_items.map((val, i) => (
                        <button
                            key = { i }
                            type = "button"
                            onClick  = { val.onClick }
                            className = "w-full p-2 hover:bg-[#F2F3F8] dark:hover:bg-[#222937] flex flex-row justify-between items-center rounded-lg"
                        >
                            <div className = "flex flex-col items-start text-left w-full">
                                <span className = "text-[#293149] dark:text-[#C0C1C4] text-sm capitalize">
                                    { val.label }
                                </span>
                                <span className = "text-[#C5C9D4] dark:text-[#6D7586] text-xs">
                                    { val.description }
                                </span>
                            </div>
                            { (val.label === "dark Mode" || val.label === "light Mode") ? 
                                <ThemeToggleButton /> 
                            : 
                                <span className = "">
                                    <FaAngleRight />
                                </span>
                            }
                        </button>
                    ))}
                </div>
                <div className = "flex justify-start text-left w-full p-2">
                    <span
                        onClick = {() => {
                            logout();
                            showSuccess("Sign out successful.")
                        }}
                        className = "text-[#F44B45] hover:text-[#f44b45af] cursor-pointer text-sm"
                    >
                        Sign out
                    </span>
                </div>
            </div>
        </div>
    )
};

export default AvatarMenuItems;