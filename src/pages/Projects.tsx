import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getAllProjects, type Project } from '@/lib/projects';
import { ExternalLink, Github, FileText, Pin } from 'lucide-react';
import { cn } from '@/lib/utils';

const truncateText = (text: string, wordCount: number) => {
  const words = text.trim().split(/\s+/);
  if (words.length > wordCount) {
    return words.slice(0, wordCount).join(' ') + '...';
  }
  return text;
};

const ProjectCard = ({ project, featured = false }: { 
  project: Project; 
  featured?: boolean;
}) => (
  <Card 
    className={cn(
      "group relative overflow-hidden hover:bg-muted/50 transition-all duration-300",
      "transform hover:-translate-y-1 hover:shadow-xl flex flex-col",
      featured ? "h-[36rem]" : "h-[32rem]", // Increased height for non-featured cards
      "border-primary/50 shadow-primary/20 shadow-lg"
    )}
  >
    {project.pinned && (
      <div className={cn(
        "absolute top-4 right-4 z-20",
        featured ? "text-cyber-neon scale-125" : "text-cyber-neon/80",
        "animate-pulse drop-shadow-[0_0_8px_rgba(0,255,255,0.5)] transition-colors duration-300"
      )}>
        <Pin className="w-5 h-5" />
      </div>
    )}

    {/* Image Container */}
    <div className={cn(
      "relative overflow-hidden",
      featured ? "h-64" : "h-52"
    )}>
      {project.image && (
        <img 
          src={project.image.url.startsWith('http') ? project.image.url : `${import.meta.env.BASE_URL}${project.image.url}`}
          alt={project.title} 
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
      )}
    </div>

    {/* Content */}
    <div className="flex flex-col flex-1 p-6">
      {/* Tags */}
      <div className="flex flex-wrap gap-2 items-center justify-center min-h-[3rem]">
        {project.tags.map((tag) => (
          <Badge 
            key={tag} 
            variant="secondary"
            className="bg-primary/10 hover:bg-primary/20 transition-colors"
          >
            {tag}
          </Badge>
        ))}
      </div>

      {/* Title */}
      <div className={cn(
        "flex items-center py-2",
        featured ? "min-h-[4rem]" : "min-h-[3rem]"
      )}>
        <h3 className={cn(
          "font-bold tracking-tight cyber-text line-clamp-2",
          featured ? "text-2xl" : "text-xl"
        )}>
          {project.title}
        </h3>
      </div>

      {/* Description */}
      <div className={cn(
        "overflow-hidden",
        featured ? "min-h-[4rem]" : "min-h-[6rem]" // Increased min-height for non-featured descriptions
      )}>
        <p className="text-muted-foreground leading-relaxed">
          {truncateText(project.description, featured ? 30 : 50)} {/* Increased word limit for non-featured */}
        </p>
      </div>
    </div>

    {/* Buttons Section */}
    <div className={cn(
      "border-t border-muted/20 bg-card/80 backdrop-blur-sm mt-auto",
      featured ? "p-6 pt-4" : "p-3 pt-2"
    )}>
      <div className="flex items-center justify-center gap-6">
        {project.demoUrl && (
          <a 
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "inline-flex items-center justify-center transition-colors hover:text-primary",
              featured ? "gap-2 text-sm" : "w-10 h-10 rounded-full hover:bg-primary/10",
              "text-muted-foreground hover:text-primary"
            )}
            title="Live Demo"
          >
            <ExternalLink className="w-5 h-5" />
            {featured && <span className="ml-1">Live Demo</span>}
          </a>
        )}

        {project.sourceUrl && (
          <a 
            href={project.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "inline-flex items-center justify-center transition-colors hover:text-primary",
              featured ? "gap-2 text-sm" : "w-10 h-10 rounded-full hover:bg-primary/10",
              "text-muted-foreground hover:text-primary"
            )}
            title="Source Code"
          >
            <Github className="w-5 h-5" />
            {featured && <span className="ml-1">Source Code</span>}
          </a>
        )}

        {project.docsUrl && (
          <a 
            href={project.docsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "inline-flex items-center justify-center transition-colors hover:text-primary",
              featured ? "gap-2 text-sm" : "w-10 h-10 rounded-full hover:bg-primary/10",
              "text-muted-foreground hover:text-primary"
            )}
            title="Documentation"
          >
            <FileText className="w-5 h-5" />
            {featured && <span className="ml-1">Documentation</span>}
          </a>
        )}
      </div>
    </div>
  </Card>
);

const Projects = () => {
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);
  const [otherProjects, setOtherProjects] = useState<Project[]>([]);

  useEffect(() => {
    const loadProjects = async () => {
      const { pinnedProjects, otherProjects } = await getAllProjects();
      setFeaturedProjects(pinnedProjects);
      setOtherProjects(otherProjects);
    };
    loadProjects();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-6">
      {/* Featured Projects */}
      <section className="mb-24">
        <div className="flex items-start justify-between gap-4 mb-12">
          <div className="flex-1 space-y-2">
            <h1 className="text-4xl sm:text-5xl font-bold gradient-text">
              Featured Projects
            </h1>
            <p className="text-lg text-muted-foreground">
              A collection of my most significant works and achievements
            </p>
          </div>
        </div>
        
        <div className="grid gap-8 sm:grid-cols-2">
          {featuredProjects.map((project) => (
            <ProjectCard 
              key={project.slug} 
              project={project} 
              featured={true}
            />
          ))}
        </div>
      </section>

      {/* More Projects */}
      {otherProjects.length > 0 && (
        <section className="pt-16 border-t border-muted">
          <h2 className="text-3xl font-bold mb-12">More Projects</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {otherProjects.map((project) => (
              <ProjectCard 
                key={project.slug} 
                project={project}
                featured={false}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default Projects;
