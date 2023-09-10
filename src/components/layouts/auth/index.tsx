import { ReactNode } from 'react';
import Logo from "../../../assets/images/hd-lgo.svg";

interface AuthRouteLayoutProps {
  children: ReactNode;
}

const AuthRouteLayout = ({ children }: AuthRouteLayoutProps) => {
  return (
    <main className = "h-screen flex flex-col m-auto select-none">
      <div className = "flex flex-col items-center justify-center grow bg-[#F3F4F9] space-y-6 p-4 dark:bg-[#11151C]">
        <div className =  "w-full bg-white dark:bg-[#222938] dark:text-white rounded-lg shadow sm:max-w-xl space-y-4 border dark:border-[#363D4C]">
          <div className = "p-10 space-y-4">
            <div className = "w-full flex flex-col items-center space-y-2">
              <img 
                src = { Logo }
                alt = "Company Logo"
              />
              <h1 className = "font-bold text-[#3E78BC] text-3xl">
                HighDef
              </h1>
            </div>
            { children }
          </div>
        </div>
      </div>
    </main>
  )
}

export default AuthRouteLayout;