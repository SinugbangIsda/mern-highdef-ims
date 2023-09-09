import { ReactNode } from "react";
import Sidebar from "../../sidebar";
import Header from "../../header";

interface LayoutProps {
  children: ReactNode;
  heading: string;
};

const PrivateRouteLayout = ({ 
  children,
  heading
}: LayoutProps) => {
  return (
    <div className = "drawer lg:drawer-open min-h-screen m-auto select-none bg-[#F4F7FC] dark:bg-[#11151C]">
      <input id = "my-drawer-2" type="checkbox" className="drawer-toggle" />
      <main className="drawer-content flex flex-col w-full h-full overflow-auto p-10 select-none">
        <Header heading = { heading } />
        <div className = "overflow-hidden h-full flex flex-col space-y-6">
          { children }
        </div>
      </main> 
      <Sidebar />
    </div>
  )
};



export default PrivateRouteLayout;