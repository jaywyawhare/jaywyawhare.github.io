import { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { getPostBySlug, type BlogPost } from '@/lib/blog';
import { Clock, Calendar, ChevronLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/components/theme-provider';

const TableOfContents = ({ items }: { items: BlogPost['tableOfContents'] }) => {
  const { theme } = useTheme();
  const isMinimal = theme === 'minimal';
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-100px 0% -80% 0%',
        threshold: 0
      }
    );

    const headings = document.querySelectorAll('h1[id], h2[id], h3[id]');
    headings.forEach((heading) => observer.observe(heading));

    return () => {
      headings.forEach((heading) => observer.unobserve(heading));
    };
  }, []);

  const handleClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const startPosition = window.pageYOffset;
      const targetPosition = startPosition + elementPosition - 100;
      
      let startTime: number | null = null;
      const duration = 600; // Even shorter duration

      const easeInOutExpo = (t: number): number => {
        if (t === 0) return 0;
        if (t === 1) return 1;
        if (t < 0.5) {
          return Math.pow(2, 20 * t - 10) / 2;
        }
        return (2 - Math.pow(2, -20 * t + 10)) / 2;
      };

      const animateScroll = (currentTime: number) => {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);

        const nextPosition = startPosition + (targetPosition - startPosition) * easeInOutExpo(progress);
        window.scrollTo(0, nextPosition);

        if (timeElapsed < duration) {
          requestAnimationFrame(animateScroll);
        } else {
          window.history.pushState({}, '', `#${id}`);
          setActiveId(id);
        }
      };

      requestAnimationFrame(animateScroll);
    }
  }, []);

  if (!items?.length) return null;

  return (
    <div className="fixed right-8 top-24 w-64 hidden lg:block">
      <div className={cn(
        "p-4 rounded-lg border",
        isMinimal 
          ? "border-border bg-background"
          : "bg-card/50 backdrop-blur border-primary/10"
      )}>
        <h3 className={cn(
          "text-sm font-semibold mb-3",
          isMinimal ? "font-mono" : "text-primary"
        )}>
          On this page
        </h3>
        <nav className="space-y-1 max-h-[70vh] overflow-y-auto">
          {items.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => handleClick(e, item.id)}
              className={cn(
                "block text-sm transition-colors py-1 px-2 rounded",
                "hover:bg-accent/50",
                { "pl-[20px]": item.level === 2 },
                { "pl-[28px]": item.level === 3 },
                activeId === item.id
                  ? "text-primary bg-accent/30"
                  : "text-muted-foreground hover:text-primary"
              )}
            >
              {item.text}
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
};

const LoadingState = () => (
  <div className="max-w-4xl mx-auto space-y-8 animate-pulse">
    <div className="h-8 bg-muted rounded w-3/4"></div>
    <div className="space-y-4">
      <div className="h-4 bg-muted rounded w-1/4"></div>
      <div className="h-4 bg-muted rounded w-1/2"></div>
    </div>
    <div className="space-y-4">
      {Array(4).fill(null).map((_, i) => (
        <div key={i} className="h-4 bg-muted rounded w-full"></div>
      ))}
    </div>
  </div>
);

const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const isMinimal = false; // Example flag, replace with actual logic

  useEffect(() => {
    const loadPost = async () => {
      if (slug) {
        const postData = await getPostBySlug(slug);
        setPost(postData);
        setLoading(false);
      }
    };
    loadPost();
  }, [slug]);

  if (loading) return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <LoadingState />
    </div>
  );

  if (!post) return (
    <div className="max-w-6xl mx-auto px-6 py-16 text-center">
      <h1 className="text-2xl font-bold mb-4">Post not found</h1>
      <Link to="/blog" className="text-primary hover:underline">
        Back to blog
      </Link>
    </div>
  );

  return (
    <div className={cn(
      "mx-auto px-6",
      isMinimal ? "max-w-3xl py-12" : "max-w-6xl py-16"
    )}>
      <Link 
        to="/blog"
        className={cn(
          "inline-flex items-center gap-2 mb-8",
          isMinimal 
            ? "text-sm text-foreground hover:text-primary"
            : "text-sm text-muted-foreground hover:text-primary"
        )}
      >
        <ChevronLeft className="w-4 h-4" />
        Back to blog
      </Link>
      
      <div className="flex gap-8">
        <article className="prose prose-invert flex-1 max-w-3xl mx-auto">
          <div className={cn(
            "not-prose",
            isMinimal ? "mb-8 space-y-4" : "mb-12 space-y-4"
          )}>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>{new Date(post.date).toLocaleDateString()}</span>
              {post.readingTime && (
                <>
                  <span>·</span>
                  <span>{post.readingTime}</span>
                </>
              )}
            </div>
            
            <h1 className={cn(
              isMinimal 
                ? "text-2xl font-mono" 
                : "text-4xl sm:text-5xl font-bold gradient-text leading-tight"
            )}>
              {post.title}
            </h1>

            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Badge 
                  key={tag} 
                  variant={isMinimal ? "minimal" : "outline"}
                  className={cn(
                    isMinimal 
                      ? "text-xs" 
                      : "bg-primary/5 hover:bg-primary/10"
                  )}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          <div 
            className={cn(
              "markdown-content",
              isMinimal && "prose-headings:font-mono prose-headings:font-normal"
            )}
            dangerouslySetInnerHTML={{ __html: post.content }} 
          />
        </article>

        <TableOfContents items={post.tableOfContents} />
      </div>
    </div>
  );
};

export default BlogPost;
