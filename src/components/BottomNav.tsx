import { Home, BookOpen, Wrench, ShoppingBag, User } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { icon: Home, label: "Home", path: "/dashboard" },
    { icon: BookOpen, label: "Academics", path: "/timetable" },
    { icon: Wrench, label: "Services", path: "/services" },
    { icon: ShoppingBag, label: "Market", path: "/marketplace" },
    { icon: User, label: "Profile", path: "/profile" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-lg z-50">
      <div className="flex items-center justify-around h-16 max-w-7xl mx-auto px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center justify-center flex-1 h-full transition-all duration-300 ${
                active ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <div
                className={`p-2 rounded-xl transition-all duration-300 ${
                  active ? "bg-gradient-primary shadow-glow" : ""
                }`}
              >
                <Icon className={`w-5 h-5 ${active ? "text-primary-foreground" : ""}`} />
              </div>
              <span className={`text-xs mt-1 font-medium ${active ? "text-primary" : ""}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
