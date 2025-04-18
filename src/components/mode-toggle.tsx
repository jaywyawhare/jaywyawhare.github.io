import { Moon, Terminal, Zap, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTheme } from "./theme-provider"

export function ModeToggle() {
  const { setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Moon className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          <Moon className="mr-2 h-4 w-4" /> Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("cyberpunk")}>
          <Zap className="mr-2 h-4 w-4" /> Cyberpunk
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("retro")}>
          <Terminal className="mr-2 h-4 w-4" /> Retro Terminal
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("minimal")}>
          <FileText className="mr-2 h-4 w-4" /> Minimal
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
