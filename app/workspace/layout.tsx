import Navbar from "@/components/navbar";
import React, { ReactNode } from "react";

interface WorkspaceLayoutProps {
  children: ReactNode;
}
const WorkspaceLayout: React.FC<WorkspaceLayoutProps> = ({ children }) => {
  return <div>{children}</div>;
};

export default WorkspaceLayout;
