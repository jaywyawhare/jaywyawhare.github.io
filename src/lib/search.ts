import { BlogPost } from './blog';
import { Project } from './projects';

export type SearchResult = {
  type: 'blog' | 'project';
  title: string;
  description: string;
  slug: string;
  tags: string[];
  contentMatch?: {
    text: string;
    position: number;
  }[];
};

function findContentMatches(content: string, searchTerm: string): { text: string; position: number }[] {
  const matches: { text: string; position: number }[] = [];
  const cleanContent = content.replace(/<[^>]*>/g, ''); // Remove HTML tags
  const searchTermLower = searchTerm.toLowerCase();
  let position = cleanContent.toLowerCase().indexOf(searchTermLower);

  while (position !== -1 && matches.length < 3) {
    const start = Math.max(0, position - 30);
    const end = Math.min(cleanContent.length, position + searchTerm.length + 30);
    let text = cleanContent.slice(start, end);
    
    if (start > 0) text = '...' + text;
    if (end < cleanContent.length) text = text + '...';

    matches.push({ text, position: start });
    position = cleanContent.toLowerCase().indexOf(searchTermLower, position + 1);
  }

  return matches;
}

export function search(query: string, blogs: BlogPost[], projects: Project[]): SearchResult[] {
  const searchTerm = query.toLowerCase().trim();
  if (!searchTerm) return [];

  const blogResults = blogs.map(blog => {
    const contentMatches = findContentMatches(blog.content, searchTerm);
    return {
      type: 'blog' as const,
      title: blog.title,
      description: blog.excerpt,
      slug: blog.slug,
      tags: blog.tags,
      contentMatch: contentMatches
    };
  });

  const projectResults = projects.map(project => ({
    type: 'project' as const,
    title: project.title,
    description: project.description,
    slug: project.slug,
    tags: project.tags
  }));

  const allResults = [...blogResults, ...projectResults];

  return allResults.filter(result => {
    const searchableText = [
      result.title,
      result.description,
      ...result.tags,
      ...(result.type === 'blog' && result.contentMatch ? 
        result.contentMatch.map(m => m.text) : [])
    ].join(' ').toLowerCase();

    return searchTerm.split(' ').every(term => 
      searchableText.includes(term)
    );
  });
}
