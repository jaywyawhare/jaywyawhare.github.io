import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getAllPosts, type BlogPost } from '@/lib/blog';
import { Calendar, Clock, ChevronRight, ChevronLeft, ChevronsLeft, ChevronsRight, ChevronDown } from 'lucide-react';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

const BlogCard = ({ post }: { post: BlogPost }) => (
  <Link to={`/blog/${post.slug}`} className="block group">
    <Card className="transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 border-primary/10 hover:border-primary/20">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row md:items-start gap-6">
          <div className="flex-1 space-y-4">
            <div className="flex flex-wrap gap-2 mb-3">
              {post.tags.map((tag) => (
                <Badge 
                  key={tag} 
                  variant="outline"
                  className="bg-primary/5 hover:bg-primary/10 transition-colors"
                >
                  {tag}
                </Badge>
              ))}
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold group-hover:text-primary transition-colors">
                {post.title}
              </h2>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {new Date(post.date).toLocaleDateString()}
                </span>
                {post.readingTime && (
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {post.readingTime}
                  </span>
                )}
              </div>
              <p className="text-muted-foreground">{post.excerpt}</p>
            </div>
            <div className="flex items-center text-sm text-primary font-medium pt-2 group-hover:translate-x-1 transition-transform">
              Read more 
              <ChevronRight className="w-4 h-4 ml-1" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  </Link>
);

const LoadingCard = () => (
  <Card className="h-[200px] animate-pulse">
    <CardContent className="p-6 space-y-4">
      <div className="h-4 bg-muted rounded w-1/4"></div>
      <div className="space-y-2">
        <div className="h-6 bg-muted rounded w-3/4"></div>
        <div className="h-4 bg-muted rounded w-1/2"></div>
        <div className="h-20 bg-muted rounded"></div>
      </div>
    </CardContent>
  </Card>
);

const Pagination = ({ 
  currentPage, 
  totalPages, 
  onPageChange 
}: { 
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) => {
  return (
    <div className="flex items-center justify-center gap-2">
      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
      >
        <ChevronsLeft className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <span className="text-sm text-muted-foreground px-4">
        Page {currentPage} of {totalPages}
      </span>
      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
      >
        <ChevronsRight className="h-4 w-4" />
      </Button>
    </div>
  );
};

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;

  useEffect(() => {
    const loadPosts = async () => {
      const allPosts = await getAllPosts();
      setPosts(allPosts);
      setLoading(false);
    };
    loadPosts();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedTags]);

  const tags = useMemo(() => {
    const allTags = Array.from(new Set(posts.flatMap(post => post.tags))).sort();
    return allTags;
  }, [posts]);

  const filteredPosts = useMemo(() => {
    let filtered = posts;
    
    if (selectedTags.length > 0) {
      filtered = filtered.filter(post => 
        selectedTags.some(tag => post.tags.includes(tag))
      );
    }
    
    return filtered;
  }, [posts, selectedTags]);

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const currentPosts = filteredPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  const handleTagClick = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-6">
      <div className="space-y-8">
        {/* Header with fixed layout */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 space-y-2">
            <h1 className="text-4xl sm:text-5xl font-bold gradient-text">
              Blog Posts
            </h1>
            <p className="text-lg text-muted-foreground">
              Exploring ideas at the intersection of AI, security, and software development
            </p>
          </div>

          <div className="flex flex-col items-end gap-2 w-[200px] flex-shrink-0">
            <DropdownMenu>
              <DropdownMenuTrigger className="w-full inline-flex items-center justify-between px-3 py-2 rounded-full border bg-background hover:bg-accent">
                <span className="text-sm">
                  {selectedTags.length > 0 
                    ? `Filter by tags (${selectedTags.length})` 
                    : 'Filter by tags'}
                </span>
                <ChevronDown className="h-4 w-4 opacity-50 ml-2" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px] max-h-[300px] overflow-y-auto">
                {tags.map((tag) => (
                  <DropdownMenuItem
                    key={tag}
                    className="flex items-center gap-2"
                    onSelect={(e) => {
                      e.preventDefault();
                      handleTagClick(tag);
                    }}
                  >
                    <div className={cn(
                      "h-3 w-3 border rounded-sm",
                      selectedTags.includes(tag) ? "bg-primary border-primary" : "border-muted"
                    )} />
                    <span className="text-sm">{tag}</span>
                    <span className="ml-auto text-xs text-muted-foreground">
                      {posts.filter(post => post.tags.includes(tag)).length}
                    </span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {selectedTags.length > 0 && (
              <div className="w-full flex flex-wrap items-center gap-1 justify-end">
                {selectedTags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="text-xs bg-primary/10 hover:bg-primary/20 cursor-pointer"
                    onClick={() => handleTagClick(tag)}
                  >
                    {tag}
                    <span className="ml-1 opacity-70">×</span>
                  </Badge>
                ))}
                <button
                  onClick={() => setSelectedTags([])}
                  className="text-xs text-muted-foreground hover:text-primary transition-colors"
                >
                  Clear
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Posts List */}
        <div className="space-y-6">
          {loading ? (
            Array(4).fill(null).map((_, i) => <LoadingCard key={i} />)
          ) : currentPosts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>

        {!loading && totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    </div>
  );
};

export default Blog;
