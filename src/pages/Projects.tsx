import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getAllProjects, type Project } from '@/lib/projects';
import { ExternalLink, Github, FileText, Pin } from 'lucide-react';
import { cn } from '@/lib/utils';
import NoProjectsFallback from '@/components/NoProjectsFallback';

const truncateText = (text: string, wordCount: number) => {
  const words = text.trim().split(/\s+/);
  if (words.length > wordCount) {
    return words.slice(0, wordCount).join(' ') + '...';
  }
  return text;
};

const ProjectCard = ({ project, featured = false }: { project: Project; featured?: boolean }) => (
  <Card 
    id={project.slug}
    className={cn(
      "group relative overflow-hidden bg-card/50 backdrop-blur border-primary/10",
      "flex flex-col rounded-3xl",
      "border-primary/50 shadow-primary/20 shadow-lg",
      "transition-shadow duration-300",
      "hover:shadow-2xl hover:shadow-primary/25",
      featured ? [
        "w-[360px]", // Adjusted width for 3 per row
        "h-[37rem]",
        "hover:border-primary/30"
      ] : [
        "w-[240px]", // Adjusted width for 5 per row
        "h-[41rem]",
        "hover:border-primary/20"
      ]
    )}
  >
    {/* Pin Icon */}
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
      "relative w-full overflow-hidden p-4",
      featured ? "h-[12rem]" : "h-[16rem]"
    )}>
      {project.image && (
        <img 
          src={project.image.url.startsWith('http') ? project.image.url : `${import.meta.env.BASE_URL}${project.image.url}`}
          alt={project.title} 
          className="absolute inset-0 w-full h-full object-contain p-2 drop-shadow-lg hover:drop-shadow-xl transition-all duration-300"
          loading="lazy"
        />
      )}
    </div>

    {/* Content Section */}
    <div className="flex flex-col flex-1 p-6">
      {/* Tags */}
      <div className={cn(
        "flex flex-wrap gap-2 items-center justify-center h-[4rem]",
        featured ? "mb-4" : "mb-6" // Increased margin for non-featured projects
      )}>
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
      <div className="h-[4rem] mb-4">
        <h3 className={cn(
          "font-bold tracking-tight cyber-text line-clamp-2",
          featured ? "text-2xl" : "text-xl"
        )}>
          {project.title}
        </h3>
      </div>

      {/* Description */}
      <div className="h-[8rem] overflow-hidden">
        <p className="text-muted-foreground leading-relaxed">
          {truncateText(project.description, featured ? 30 : 50)}
        </p>
      </div>
    </div>

    {/* Action Buttons */}
    <div className="border-t border-muted/20 bg-card/80 backdrop-blur-sm mt-auto p-3">
      <div className="flex items-center justify-center gap-6">
        {[
          { url: project.demoUrl, icon: ExternalLink, title: "Live Demo" },
          { url: project.sourceUrl, icon: Github, title: "Source Code" },
          { url: project.docsUrl, icon: FileText, title: "Documentation" }
        ].map((link, i) => link.url && (
          <a 
            key={i}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center w-10 h-10 rounded-full 
                     text-muted-foreground hover:text-primary hover:bg-primary/10 
                     transition-colors"
            title={link.title}
          >
            <link.icon className="w-5 h-5" />
          </a>
        ))}
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

  useEffect(() => {
    // Scroll to hash element after page loads
    const hash = window.location.hash.slice(1);
    if (hash) {
      setTimeout(() => {
        const element = document.getElementById(hash);
        element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    }
  }, [featuredProjects, otherProjects]);

  if (featuredProjects.length === 0 && otherProjects.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-32">
        <NoProjectsFallback 
          message="No projects available yet. Check back soon!" 
          className="min-h-[400px]"
        />
      </div>
    );
  }

  return (
    <div className="max-w-[90rem] mx-auto px-6 py-6"> {/* Increased max width */}
      {/* Featured Projects */}
      {featuredProjects.length > 0 && (
        <section className="mb-24">
          <div className="flex items-start justify-between gap-4 mb-12">
            <div className="flex-1">
              <h1 className="text-4xl sm:text-5xl font-bold gradient-text">
                Featured Projects
              </h1>
            </div>
          </div>
          
          <div className={cn(
            "flex flex-wrap gap-6",
            "justify-center lg:justify-evenly"
          )}>
            {featuredProjects.map((project) => (
              <ProjectCard 
                key={project.slug} 
                project={project} 
                featured={true}
              />
            ))}
          </div>
        </section>
      )}

      {/* More Projects */}
      {otherProjects.length > 0 && (
        <section className={cn("pt-16", featuredProjects.length > 0 && "border-t border-muted")}>
          {featuredProjects.length === 0 ? (
            <div className="flex items-start justify-between gap-4 mb-12">
              <div className="flex-1">
                <h2 className="text-4xl sm:text-5xl font-bold gradient-text">
                  Projects
                </h2>
              </div>
            </div>
          ) : (
            <h2 className="text-3xl font-bold mb-12">More Projects</h2>
          )}
          <div className={cn(
            "flex flex-wrap gap-4",
            "justify-center lg:justify-evenly"
          )}>
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
