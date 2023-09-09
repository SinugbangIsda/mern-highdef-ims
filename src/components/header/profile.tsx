import { useState } from "react";
import Avatar from "react-avatar";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { FaCaretDown } from "react-icons/fa";
import { logOut } from "../../redux/slices/authSlice";
import { setTheme } from "../../redux/slices/themeSlice";
import AvatarMenuItems from "./avatar/menuitems";
import { User } from "../../interfaces";
import { useToast } from "../../hooks/useToast";

const ProfileButton = () => {
    const [ isClicked, setIsClicked ] = useState<boolean>(false);
    const user = useAppSelector((state) => state.auth.user);
    const theme = useAppSelector((state) => state.theme);
    const dispatch = useAppDispatch();
    const userData: User = JSON.parse(user);
    const { firstname, lastname, email_address, role }  = userData;
    const { showInfo } = useToast();

    return (
            <div className =  "w-auto md:w-72 dropdown space-y-2">
                <button
                    tabIndex = { 0 }
                    type = "button"
                    onClick = {() => setIsClicked(!isClicked)}
                    className = "flex flex-row items-center gap-2 w-full hover:bg-[#dee0e4] dark:hover:bg-[#30363D] rounded-xl p-2" 
                >
                    <Avatar 
                        name = { firstname + " " + lastname }
                        maxInitials = { 2 }
                        round = { true }
                        size = "45"
                        color = "#191D22"
                        fgColor = "white"
                    />
                    <div className = "hidden md:flex md:flex-col items-start w-full">
                        <span className = "text-sm text-[#2C3236] dark:text-white font-bold">
                            { firstname + " " + lastname }
                        </span>
                        <span className = "capitalize text-xs text-[#A2ABB5] dark:text-[#87929B]">
                            { role }
                        </span>
                    </div>
                    <FaCaretDown className = "hidden md:flex text-lg text-[#6C7688] dark:text-white -mt-3"/>
                </button>
                { isClicked && (
                    <AvatarMenuItems 
                        firstname = { firstname }
                        lastname = { lastname }
                        email_address = { email_address }
                        menu_items = {[
                            {
                                label: "My Profile",
                                description: "View your profile information",
                                onClick: () =>showInfo("Feature under development.")
                            },
                            {
                                label: `${theme === "dark" ? "light" : "dark"} Mode`,
                                description: "Dark theme or Light theme",
                                onClick: () => dispatch(setTheme(theme === "dark" ? "light" : "dark"))
                            }
                        ]}
                        logout = {() => dispatch(logOut())}
                    />
                )}
            </div>
    )
}

export default ProfileButton;