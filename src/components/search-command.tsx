import { useEffect, useState, useCallback } from "react"
import { useNavigate } from "react-router-dom"
import { Command } from "cmdk"
import { Search, FileText, FolderGit2, ArrowRight } from "lucide-react"
import { getAllPosts, type BlogPost } from "@/lib/blog"
import { getAllProjects, type Project } from "@/lib/projects"
import { search, type SearchResult } from "@/lib/search"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export function SearchCommand() {
  const [open, setOpen] = useState(false)
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState(false)
  const [query, setQuery] = useState("")
  const navigate = useNavigate()
  const [initialData, setInitialData] = useState<{
    posts: BlogPost[];
    projects: Project[];
  }>();

  // Load initial data
  useEffect(() => {
    const loadInitialData = async () => {
      const [posts, { pinnedProjects, otherProjects }] = await Promise.all([
        getAllPosts(),
        getAllProjects()
      ]);
      setInitialData({
        posts,
        projects: [...pinnedProjects, ...otherProjects]
      });
    };
    loadInitialData();
  }, []);

  // Handle keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen(prev => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Debounced search function
  const debouncedSearch = useCallback((searchQuery: string) => {
    if (!initialData || !searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    setLoading(true);
    const results = search(searchQuery, initialData.posts, initialData.projects);
    setSearchResults(results);
    setLoading(false);
  }, [initialData]);

  const handleQueryChange = (value: string) => {
    setQuery(value);
    debouncedSearch(value);
  };

  const handleSelect = (result: SearchResult) => {
    if (result.type === 'blog') {
      navigate(`/blog/${result.slug}`);
    } else {
      navigate(`/projects#${result.slug}`);
    }
    setOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 px-3 py-1.5 text-muted-foreground hover:text-foreground transition-colors rounded-full border border-border/40 hover:border-border/80"
      >
        <Search className="h-4 w-4" />
        <span className="text-sm hidden sm:inline-block">Search...</span>
        <kbd className="hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>

      <Command.Dialog
        open={open}
        onOpenChange={setOpen}
        className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24"
        shouldFilter={false}
      >
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm" />
        <div className="relative w-full max-w-2xl overflow-hidden rounded-xl border bg-popover shadow-lg animate-in fade-in-0 zoom-in-95">
          <div className="flex items-center border-b px-3">
            <Search className="h-4 w-4 shrink-0 opacity-50" />
            <Command.Input
              value={query}
              onValueChange={handleQueryChange}
              placeholder="Search blogs and projects..."
              className="flex h-11 w-full rounded-md bg-transparent py-3 px-2 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>

          <Command.List className="max-h-[60vh] overflow-y-auto overscroll-contain">
            {loading ? (
              <div className="p-6 text-center text-sm text-muted-foreground">
                Searching...
              </div>
            ) : query.trim() === "" ? (
              <div className="p-6 text-center text-sm text-muted-foreground">
                Start typing to search...
              </div>
            ) : searchResults.length === 0 ? (
              <div className="p-6 text-center text-sm text-muted-foreground">
                No results found for "{query}"
              </div>
            ) : (
              <div className="px-2 py-3">
                {searchResults.map((result) => (
                  <Command.Item
                    key={`${result.type}-${result.slug}`}
                    onSelect={() => handleSelect(result)}
                    onClick={() => handleSelect(result)}
                    role="button"
                    value={result.title}
                    className="group relative flex cursor-pointer select-none rounded-sm px-2 py-3 text-sm outline-none 
                             aria-selected:bg-accent aria-selected:text-accent-foreground 
                             hover:bg-accent hover:text-accent-foreground transition-colors
                             data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground"
                  >
                    <div className="flex items-center gap-2 w-full pointer-events-auto">
                      <div className="flex h-10 w-10 items-center justify-center rounded-md border border-border/50 bg-background shrink-0 pointer-events-none">
                        {result.type === 'blog' ? (
                          <FileText className="h-5 w-5 text-primary" />
                        ) : (
                          <FolderGit2 className="h-5 w-5 text-primary" />
                        )}
                      </div>
                      
                      <div className="flex-1 space-y-1 pointer-events-none">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{result.title}</span>
                          <ArrowRight className="h-4 w-4 text-muted-foreground/50 group-hover:text-muted-foreground/70 transition-colors ml-auto" />
                        </div>
                        <div className="line-clamp-1 text-muted-foreground text-xs">
                          {result.description}
                        </div>
                        {result.contentMatch && result.contentMatch.length > 0 && (
                          <div className="mt-1 space-y-1">
                            {result.contentMatch.map((match, idx) => (
                              <div key={idx} className="text-xs bg-muted/50 rounded p-1">
                                {match.text}
                              </div>
                            ))}
                          </div>
                        )}
                        <div className="flex items-center gap-2 mt-1">
                          {result.tags.slice(0, 3).map(tag => (
                            <Badge 
                              key={tag} 
                              variant="secondary" 
                              className="text-[10px] px-1 py-0 rounded"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Command.Item>
                ))}
              </div>
            )}
          </Command.List>
        </div>
      </Command.Dialog>
    </>
  );
}
