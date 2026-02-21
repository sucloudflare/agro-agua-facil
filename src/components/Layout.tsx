import { NavLink, useLocation } from "react-router-dom";
import { Home, MapPin, Activity, Droplets, Settings } from "lucide-react";

const navItems = [
  { to: "/", icon: Home, label: "Início" },
  { to: "/fazendas", icon: MapPin, label: "Fazendas" },
  { to: "/monitoramento", icon: Activity, label: "Monitor" },
  { to: "/irrigacao", icon: Droplets, label: "Irrigação" },
  { to: "/configuracoes", icon: Settings, label: "Config" },
];

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-primary px-4 py-3 shadow-md">
        <div className="flex items-center justify-between max-w-5xl mx-auto">
          <div className="flex items-center gap-2">
            <Droplets className="h-7 w-7 text-primary-foreground" />
            <h1 className="text-lg font-bold text-primary-foreground tracking-tight">AgroSmart</h1>
          </div>
          <span className="text-xs text-primary-foreground/70">Irrigação Inteligente</span>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto pb-20 px-4 py-4 max-w-5xl mx-auto w-full">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border shadow-lg">
        <div className="flex justify-around items-center max-w-5xl mx-auto">
          {navItems.map(({ to, icon: Icon, label }) => {
            const isActive = location.pathname === to;
            return (
              <NavLink
                key={to}
                to={to}
                className={`flex flex-col items-center py-2 px-3 min-w-[60px] transition-colors ${
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon className={`h-6 w-6 ${isActive ? "stroke-[2.5]" : ""}`} />
                <span className="text-[10px] mt-0.5 font-medium">{label}</span>
              </NavLink>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default Layout;
