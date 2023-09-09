import Logo from "../../assets/images/hd-lgo.svg";
import { useAppSelector } from "../../redux/hooks";
import { useNavigate, useLocation } from "react-router-dom"
import { MdDashboard } from "react-icons/md";
import { TbReport } from "react-icons/tb";
import { PiUsersFill } from "react-icons/pi";
import SidebarFooter from "./footer";
import { User } from "../../interfaces";

const navlinks =  [
  {
    label: "Dashboard",
    path: "/",
    allowUsers: true,
    icon: <MdDashboard />
  },
  {
    label: "Transactions",
    path: "/transactions",
    allowUsers: true,
    icon: <TbReport />
  },
  {
    label: "Users",
    path: "/users",
    allowUsers: false,
    icon: <PiUsersFill />
  }
];

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = useAppSelector((state) => state.auth.user);
  const userData: User = JSON.parse(user);
  const  { role } = userData;

  return (
    <>
      <div className = "drawer-side">
        <label htmlFor = "my-drawer-2" className="drawer-overlay"></label> 
        <ul className = "menu p-4 w-auto min-h-full bg-white dark:bg-black gap-10 flex flex-col justify-between items-center pb-10">
          <div className = "space-y-10">
            <div className = "flex flex-row w-full items-center gap-4">
              <img 
                src = { Logo }
                alt = "Company Logo"
                className = "w-16"
              />
              <h1 className = "font-bold text-2xl text-[#383A45] dark:text-white">
                HighDef
              </h1>
            </div>
            <div className = "space-y-4">
              { navlinks.map((val, i) => (
                (val.allowUsers || role === "Admin") &&  (
                  <li 
                    key = { i }
                    className = {
                      "flex flex-row items-center hover:text-[#4C515C] hover:bg-[#F2F3F8] dark:hover:text-white dark:hover:bg-[#12151B] rounded-lg cursor-pointer text-lg font-semibold w-full " +
                      (val.path === location.pathname ? "text-[#394043] bg-[#F2F3F8] dark:text-white dark:bg-[#12151B]" : "text-[#7B889D]")
                    }
                    onClick = {() => navigate(val.path)}
                  >
                    <span className = "w-full py-4 px-6">
                      { val.icon }
                      { val.label }
                    </span>
                  </li>
                )
              ))}
            </div>
          </div>
          <SidebarFooter />
        </ul>
      </div>
    </>
  )
}

export default Sidebar;