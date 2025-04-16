import { Link } from "react-router-dom"
import { ModeToggle } from "./mode-toggle"
import { SearchCommand } from "./search-command"

export function Navigation() {
  return (
    <header className="fixed top-0 w-full z-50">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between glass-card">
        <Link to="/" className="text-lg font-semibold gradient-text">
          JW.
        </Link>
        <div className="flex items-center gap-4">
          <SearchCommand />
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
