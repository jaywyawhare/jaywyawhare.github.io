import { marked } from 'marked';

// Define types for the import.meta.glob result
type GlobModule = {
  [key: string]: string;
};

export interface Project {
  slug: string;
  title: string;
  description: string;
  date: string;  // Required date field
  tags: string[];
  demoUrl?: string;    // Optional live demo URL
  sourceUrl?: string;  // Optional source code URL
  docsUrl?: string;    // Optional documentation URL
  image?: {
    url: string;
    isExternal: boolean;
  };
  content: string;
  pinned?: boolean;
}

function validateImageUrl(url: string): { url: string; isExternal: boolean } {
  const isExternal = url.startsWith('http://') || url.startsWith('https://');
  return {
    url: url,
    isExternal
  };
}

// Type-safe glob import
const projectModules: GlobModule = import.meta.glob('/src/content/projects/*.md', { 
  eager: true,
  as: 'raw' 
}) as GlobModule;

export async function getAllProjects(): Promise<{
  pinnedProjects: Project[];
  otherProjects: Project[];
}> {
  const projects = await Promise.all(
    Object.entries(projectModules).map(async ([filepath, content]: [string, string]) => {
      const slug = filepath.replace(/^.*\/(.+)\.md$/, '$1');
      const { frontmatter, body } = parseFrontmatter(content);
      const htmlContent = await marked(body);

      return {
        slug,
        ...frontmatter,
        content: htmlContent,
      } as Project;
    })
  );

  // Sort projects by date in descending order (newest first)
  const sortedProjects = projects.sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return {
    pinnedProjects: sortedProjects.filter(p => p.pinned),
    otherProjects: sortedProjects.filter(p => !p.pinned)
  };
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const { pinnedProjects, otherProjects } = await getAllProjects();
  const allProjects = [...pinnedProjects, ...otherProjects];
  return allProjects.find(project => project.slug === slug) || null;
}

interface Frontmatter {
  [key: string]: any;
  image?: string;
}

function parseFrontmatter(content: string): { frontmatter: Frontmatter; body: string } {
  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) {
    throw new Error('Invalid frontmatter format');
  }

  const [, frontmatterStr, body] = match;
  const frontmatter: Frontmatter = Object.fromEntries(
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
        const trimmedKey = key.trim();
        if (trimmedKey === 'image' && value) {
          return [trimmedKey, validateImageUrl(value)];
        }
        return [trimmedKey, value];
      })
  );

  return { frontmatter, body };
}
