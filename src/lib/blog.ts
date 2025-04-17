import { marked } from 'marked';

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  author: string;
  tags: string[];
  excerpt: string;
  content: string;
  readingTime?: string;
  tableOfContents?: TableOfContentsItem[];
}

interface TableOfContentsItem {
  id: string;
  text: string;
  level: number;
}

function extractTableOfContents(content: string): TableOfContentsItem[] {
  const headings = content.match(/^#{1,3}\s+.+$/gm) || [];
  return headings.map(heading => {
    const level = (heading.match(/^#+/) || [''])[0].length;
    const text = heading.replace(/^#+\s+/, '');
    const id = text.toLowerCase().replace(/[^\w]+/g, '-');
    return { id, text, level };
  });
}

const blogModules = import.meta.glob('/src/content/blogs/*.md', { 
  eager: true,
  as: 'raw' 
});

export async function getAllPosts(): Promise<BlogPost[]> {
  try {
    const posts = await Promise.all(
      Object.entries(blogModules).map(async ([filepath, content]) => {
        const slug = filepath.replace(/^.*\/(.+)\.md$/, '$1');
        const { frontmatter, body } = parseFrontmatter(content);
        const htmlContent = await marked(body);
        const tableOfContents = extractTableOfContents(body);

        return {
          slug,
          ...frontmatter,
          content: htmlContent,
          tableOfContents
        } as BlogPost;
      })
    );

    return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (error) {
    console.warn('Error loading blog posts:', error);
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const posts = await getAllPosts();
  return posts.find(post => post.slug === slug) || null;
}

function parseFrontmatter(content: string) {
  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) {
    throw new Error('Invalid frontmatter format');
  }

  const [, frontmatterStr, body] = match;
  const frontmatter = Object.fromEntries(
    frontmatterStr.split('\n')
      .filter(Boolean)
      .map(line => {
        const [key, ...values] = line.split(':');
        let value = values.join(':').trim();
        if (value.startsWith('"') && value.endsWith('"')) {
          value = value.slice(1, -1);
        }
        if (value.startsWith('[') && value.endsWith(']')) {
          value = JSON.parse(value);
        }
        return [key.trim(), value];
      })
  );

  return { frontmatter, body };
}
