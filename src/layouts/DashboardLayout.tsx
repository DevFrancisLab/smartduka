import React, { ReactNode } from "react";
import Sidebar from "@/components/Sidebar";

interface DashboardLayoutProps {
  children?: ReactNode;
  active?: string;
  onNavigate?: (id: string) => void;
}

export default function DashboardLayout({ children, active = "dashboard", onNavigate }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Sidebar is fixed on lg and above; for smaller screens it overlays via its own logic */}
      <Sidebar active={active} onNavigate={onNavigate} />

      {/* Main content area. On large screens leave space for the fixed sidebar (lg:ml-64). */}
      <main className="w-full lg:ml-64">
        <div className="px-4 sm:px-6 lg:px-10 py-6 lg:py-10">
          {/* Empty layout - insert page content here */}
          {children}
        </div>
      </main>
    </div>
  );
}
