import React, { ReactNode } from "react";
import Sidebar from "./_components/Sidebar";
import Navbar from "@/components/navbar";

interface LayoutProps {
  children: ReactNode;
}

const DashboardLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <div className="hidden md:flex flex-col md:w-64 bg--600 fixed h-screen">
        <Sidebar />
      </div>
      <div className="md:ml-64 bg--200 m-2">
        <Navbar showLinkOnSmallDevices={false} />
        <div>{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
