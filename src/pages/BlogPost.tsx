import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { getPostBySlug, type BlogPost } from '@/lib/blog';
import { Clock, Calendar, ChevronLeft } from 'lucide-react';

const TableOfContents = ({ items }: { items: BlogPost['tableOfContents'] }) => {
  if (!items?.length) return null;

  return (
    <div className="hidden lg:block sticky top-24 w-64 ml-8">
      <div className="p-4 rounded-lg bg-card/50 backdrop-blur border border-primary/10">
        <h3 className="text-sm font-semibold mb-3 text-primary">On this page</h3>
        <nav className="space-y-1">
          {items.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="block text-sm text-muted-foreground hover:text-primary transition-colors py-1"
              style={{ paddingLeft: `${(item.level - 1) * 12}px` }}
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
    <div className="max-w-6xl mx-auto px-6 py-16">
      <Link 
        to="/blog"
        className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8 transition-colors"
      >
        <ChevronLeft className="w-4 h-4 mr-1" />
        Back to blog
      </Link>
      
      <div className="flex flex-col lg:flex-row gap-8">
        <article className="prose prose-invert max-w-4xl mx-auto">
          <div className="not-prose mb-12 space-y-4">
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Badge 
                  key={tag} 
                  variant="outline"
                  className="bg-primary/5 hover:bg-primary/10"
                >
                  {tag}
                </Badge>
              ))}
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold gradient-text leading-tight">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
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
              <span>By {post.author}</span>
            </div>
          </div>
          <div 
            className="markdown-content"
            dangerouslySetInnerHTML={{ __html: post.content }} 
          />
        </article>
        <TableOfContents items={post.tableOfContents} />
      </div>
    </div>
  );
};

export default BlogPost;
