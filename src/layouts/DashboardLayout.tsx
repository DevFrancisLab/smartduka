import React, { ReactNode, useState } from "react";
import Sidebar from "@/components/Sidebar";

interface DashboardLayoutProps {
  children?: ReactNode;
  active?: string;
  onNavigate?: (id: string) => void;
}

export default function DashboardLayout({ children, active = "dashboard", onNavigate }: DashboardLayoutProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="h-screen bg-background text-foreground overflow-hidden flex flex-col">
      {/* Sidebar is fixed on lg and above; for smaller screens it overlays via its own logic */}
      <Sidebar 
        active={active} 
        onNavigate={onNavigate}
        isCollapsed={isCollapsed}
        onToggleCollapse={setIsCollapsed}
      />

      {/* Main content area. On large screens leave space for the fixed sidebar (lg:ml-64 or lg:ml-20 when collapsed). */}
      <main className={`flex-1 overflow-y-auto transition-all duration-300 ease-in-out ${isCollapsed ? "lg:ml-20" : "lg:ml-64"}`}>
        <div className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 lg:py-5 h-full flex flex-col">
          {/* Empty layout - insert page content here */}
          {children}
        </div>
      </main>
    </div>
  );
}
