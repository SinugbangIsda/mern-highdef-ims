import { HeaderProps } from "../../interfaces";
import ProfileButton from "./profile";
import HeaderThemeToggle from "./themetoggle";

const Header = ({
  heading
}: HeaderProps) => {
  
  return (
    <div className = "flex flex-row justify-between items-center space-x-3">
      <h2 className = "font-bold text-xl md:text-3xl text-[#383A45] dark:text-white">
        { heading }
      </h2>
      <div className = "flex flex-row justify-end items-center w-full space-x-2">
        <HeaderThemeToggle />
        <ProfileButton />
      </div>
    </div>
  )
}

export default Header;
