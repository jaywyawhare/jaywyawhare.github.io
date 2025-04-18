import { Link, useLocation } from "react-router-dom"
import { ModeToggle } from "@/components/mode-toggle"
import { SearchCommand } from "@/components/search-command"
import { cn } from "@/lib/utils"
import { useTheme } from "./theme-provider"

export function Navigation() {
  const { theme } = useTheme();
  const location = useLocation();
  
  const isMinimal = theme === 'minimal';
  
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

  const ExternalLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
    <a 
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
    >
      {children}
    </a>
  );

  return (
    <header className={cn(
      "fixed top-0 w-full z-50 px-4",
      isMinimal && "bg-background"
    )}>
      <div className={cn(
        "container mx-auto h-16 flex items-center justify-between",
        !isMinimal && "glass-card rounded-2xl px-6",
        isMinimal && "bg-background"
      )}>
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center">
            {!isMinimal && <img src="/assets/logo.png" alt="Logo" className="h-8 w-auto" />}
            {isMinimal && <span className="text-lg font-mono">Jay Wyawhare</span>}
          </Link>

          {isMinimal && (
            <div className="flex items-center gap-4 text-sm">
              <ExternalLink href="https://drive.google.com/file/d/your-resume-file-id/view">
                Resume
              </ExternalLink>
              <span className="text-muted-foreground">·</span>
              <ExternalLink href="https://cal.com/jaywyawhare/30min">
                Meeting
              </ExternalLink>
              <span className="text-muted-foreground">·</span>
              <ExternalLink href="mailto:contact@jaywyawhare.com">
                Email
              </ExternalLink>
              <span className="text-muted-foreground">·</span>
              <ExternalLink href="https://linkedin.com/in/jaywyawhare">
                LinkedIn
              </ExternalLink>
              <span className="text-muted-foreground">·</span>
              <ExternalLink href="https://github.com/jaywyawhare">
                GitHub
              </ExternalLink>
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-8">
          <nav className="hidden md:flex items-center gap-8">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/projects">Projects</NavLink>
            <NavLink to="/blog">Blog</NavLink>
          </nav>
          
          <div className="flex items-center gap-4">
            <SearchCommand />
            <ModeToggle />
          </div>
        </div>
      </div>
    </header>
  );
};
