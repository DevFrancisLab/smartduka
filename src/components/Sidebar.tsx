import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Home,
  ShoppingCart,
  CreditCard,
  Box,
  DollarSign,
  AlertCircle,
  BarChart2,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface NavItem {
  id: string;
  label: string;
  Icon: any;
}

const NAV_ITEMS: NavItem[] = [
  { id: "dashboard", label: "Dashboard", Icon: Home },
  { id: "sales", label: "Sales", Icon: ShoppingCart },
  { id: "expenses", label: "Expenses", Icon: CreditCard },
  { id: "stock", label: "Stock / Procurement", Icon: Box },
  { id: "cashfloat", label: "Cash Float", Icon: DollarSign },
  { id: "debttracker", label: "Debts", Icon: AlertCircle },
  { id: "reports", label: "Reports", Icon: BarChart2 },
];

interface SidebarProps {
  active?: string;
  onNavigate?: (id: string) => void;
  isCollapsed?: boolean;
  onToggleCollapse?: (collapsed: boolean) => void;
}

export default function Sidebar({ active = "dashboard", onNavigate, isCollapsed = false, onToggleCollapse }: SidebarProps) {
  const [open, setOpen] = useState(false);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const navigate = useNavigate();

  const handleNav = (id: string) => {
    onNavigate?.(id);
    // navigate via router if parent didn't handle navigation
    try {
      const pathMap: Record<string, string> = {
        dashboard: '/dashboard',
        sales: '/sales',
        expenses: '/expenses',
        stock: '/stock',
        cashfloat: '/cashfloat',
        debttracker: '/debttracker',
        reports: '/reports',
        settings: '/settings',
        logout: '/',
      };
      const navigateTo = pathMap[id] ?? `/${id}`;
      // prefer parent navigation, but fallback to router
      if (!onNavigate) navigate(navigateTo);
    } catch (e) {
      // ignore navigation errors
    }
    setOpen(false); // close mobile panel on nav
  };

  // Lock body scroll when mobile drawer is open and focus the close button
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      // focus close button after next paint
      setTimeout(() => closeBtnRef.current?.focus(), 50);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* Mobile: hamburger */}
      <div className="fixed top-4 left-4 z-50 lg:hidden">
        <button
          onClick={() => setOpen(true)}
          className="p-2 rounded-md bg-card/80 backdrop-blur-sm border border-border text-foreground"
          aria-label="Open navigation"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {/* Mobile overlay panel */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ease-in-out ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        aria-hidden={!open}
      >
        <div
          className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ease-in-out ${open ? "opacity-100" : "opacity-0"}`}
          onClick={() => setOpen(false)}
        />

        <aside
          role="dialog"
          aria-modal="true"
          className={`absolute inset-y-0 left-0 w-64 bg-card p-4 border-r border-border transform transition-transform duration-300 ease-in-out ${open ? "translate-x-0" : "-translate-x-full"}`}
          aria-label="Sidebar navigation"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="text-lg font-bold">
              <span className="text-foreground">Smart</span>
              <span className="text-gradient-gold">Duka</span>
            </div>
            <button
              ref={closeBtnRef}
              onClick={() => setOpen(false)}
              className="p-2 rounded-md text-foreground focus:ring-2 focus:ring-offset-1 focus:ring-gradient-gold/30"
              aria-label="Close navigation"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="h-px bg-muted-foreground/10 mb-4" />

          <nav className="flex flex-col gap-2">
            {NAV_ITEMS.map((n) => {
              const isActive = n.id === active;
              const base = "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-150 focus:outline-none w-full text-left";
              const activeClasses = "bg-gradient-gold/10 text-gradient-gold ring-1 ring-gradient-gold/20";
              const inactiveClasses = "text-foreground hover:bg-muted-foreground/5";

              return (
                <button
                  key={n.id}
                  onClick={() => handleNav(n.id)}
                  className={`${base} ${isActive ? activeClasses : inactiveClasses}`}
                  aria-current={isActive ? "page" : undefined}
                >
                  <n.Icon className="w-5 h-5" />
                  <span className="text-sm font-semibold">{n.label}</span>
                </button>
              );
            })}
          </nav>

          <div className="mt-auto pt-4">
            <div className="h-px bg-muted-foreground/10 mb-3" />
            <button onClick={() => handleNav("settings")} className="flex items-center gap-3 w-full text-left px-3 py-2 rounded-lg hover:bg-muted-foreground/5">
              <Settings className="w-5 h-5" />
              <span className="text-sm font-semibold">Settings</span>
            </button>
            <button onClick={() => handleNav("logout")} className="flex items-center gap-3 w-full text-left px-3 py-2 rounded-lg hover:bg-muted-foreground/5 mt-2">
              <LogOut className="w-5 h-5" />
              <span className="text-sm font-semibold">Logout</span>
            </button>
          </div>
        </aside>
      </div>

      {/* Desktop sidebar */}
      <aside className={`hidden lg:flex lg:flex-col lg:fixed lg:inset-y-0 lg:left-0 lg:z-20 lg:bg-card lg:border-r lg:border-border lg:transition-all lg:duration-300 lg:ease-in-out ${isCollapsed ? "lg:w-20" : "lg:w-64"}`}>
        <div className="flex flex-col h-full">
          {/* Header with brand and collapse toggle */}
          <div className={`flex items-center justify-between gap-2 p-4 ${isCollapsed ? "" : "mb-6"}`}>
            {!isCollapsed && (
              <div className="text-xl font-bold">
                <span className="text-foreground">Smart</span>
                <span className="text-gradient-gold">Duka</span>
              </div>
            )}
            <button
              onClick={() => onToggleCollapse?.(!isCollapsed)}
              className="p-1.5 rounded-md hover:bg-muted-foreground/10 transition-colors duration-200 text-foreground"
              aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {isCollapsed ? (
                <ChevronRight className="w-5 h-5" />
              ) : (
                <ChevronLeft className="w-5 h-5" />
              )}
            </button>
          </div>

          {!isCollapsed && <div className="h-px bg-muted-foreground/10 mb-4" />}

          {/* Navigation items */}
          <nav className="flex-1 flex flex-col gap-1">
            {NAV_ITEMS.map((n) => {
              const isActive = n.id === active;
              const base = "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors duration-150 focus:outline-none";
              const activeClasses = "bg-gradient-gold/10 text-gradient-gold ring-1 ring-gradient-gold/20";
              const inactiveClasses = "text-foreground hover:bg-muted-foreground/5";

              return (
                <button
                  key={n.id}
                  onClick={() => handleNav(n.id)}
                  className={`${base} ${isActive ? activeClasses : inactiveClasses}`}
                  aria-current={isActive ? "page" : undefined}
                  title={isCollapsed ? n.label : undefined}
                >
                  <n.Icon className="w-5 h-5 flex-shrink-0" />
                  {!isCollapsed && <span className="text-sm font-semibold truncate">{n.label}</span>}
                </button>
              );
            })}
          </nav>

          {/* Bottom section with settings and logout */}
          <div className="mt-auto pt-4">
            {!isCollapsed && <div className="h-px bg-muted-foreground/10 mb-3" />}
            <button
              onClick={() => handleNav("settings")}
              className={`flex items-center gap-3 w-full text-left px-3 py-2.5 rounded-lg hover:bg-muted-foreground/5 transition-colors duration-150 ${isCollapsed ? "justify-center" : ""}`}
              title={isCollapsed ? "Settings" : undefined}
            >
              <Settings className="w-5 h-5 flex-shrink-0" />
              {!isCollapsed && <span className="text-sm font-semibold truncate">Settings</span>}
            </button>
            <button
              onClick={() => handleNav("logout")}
              className={`flex items-center gap-3 w-full text-left px-3 py-2.5 rounded-lg hover:bg-muted-foreground/5 transition-colors duration-150 mt-2 ${isCollapsed ? "justify-center" : ""}`}
              title={isCollapsed ? "Logout" : undefined}
            >
              <LogOut className="w-5 h-5 flex-shrink-0" />
              {!isCollapsed && <span className="text-sm font-semibold truncate">Logout</span>}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
