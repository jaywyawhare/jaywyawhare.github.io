import { Link, useLocation } from "react-router-dom"
import { ModeToggle } from "./mode-toggle"
import { SearchCommand } from "./search-command"
import { cn } from "@/lib/utils"

export function Navigation() {
  const location = useLocation();
  
  const NavLink = ({ to, children }: { to: string; children: React.ReactNode }) => {
    const isActive = location.pathname === to;
    
    return (
      <Link 
        to={to} 
        className={cn(
          "text-base font-medium transition-all relative py-1",
          "after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:origin-left",
          "after:transform after:scale-x-0 after:transition-transform",
          isActive ? [
            "text-primary",
            "after:bg-primary after:scale-x-100"
          ] : [
            "text-muted-foreground hover:text-foreground",
            "hover:after:bg-foreground/50 hover:after:scale-x-100"
          ]
        )}
      >
        {children}
      </Link>
    );
  };

  return (
    <header className="fixed top-0 w-full z-50 px-4">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between glass-card rounded-2xl">
        <Link to="/" className="text-lg font-semibold gradient-text">
          JW.
        </Link>
        
        <div className="flex items-center gap-8">
          <nav className="hidden md:flex items-center gap-8">
            <NavLink to="/projects">Projects</NavLink>
            <NavLink to="/blog">Blog</NavLink>
            <NavLink to="/resume">Resume</NavLink>
          </nav>
          
          <div className="flex items-center gap-4">
            <SearchCommand />
            <ModeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
