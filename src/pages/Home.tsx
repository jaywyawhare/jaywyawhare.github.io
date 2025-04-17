import { FileText, Book, Archive } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import aboutData from '@/content/about.json';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import Socials from '@/components/Socials';

// Define the interface for experience items
interface ExperienceItem {
  role: string;
  title: string;
  period: string;
  description: string;
  tags: string[];
  highlights?: string[]; // Make highlights optional
}

const ExperienceCard = ({ experience }: { experience: ExperienceItem }) => (
  <div className="relative pl-6 pb-6 last:pb-0 border-l border-primary/20 last:border-0 group">
    <div className="absolute left-0 top-2 w-2 h-2 rounded-full bg-primary transform -translate-x-[5px] group-hover:scale-150 transition-transform duration-300" />
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-xl cyber-text">{experience.role}</h3>
        <span className="text-sm text-muted-foreground bg-primary/5 px-3 py-1 rounded-full">
          {experience.period}
        </span>
      </div>
      <p className="text-primary text-lg">{experience.title}</p>
      <p className="text-muted-foreground leading-relaxed">{experience.description}</p>
      {experience.highlights && (
        <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
          {experience.highlights.map((highlight: string, i: number) => (
            <li key={i}>{highlight}</li>
          ))}
        </ul>
      )}
      <div className="flex flex-wrap gap-2 mt-2">
        {experience.tags.map((tag) => (
          <Badge 
            key={tag} 
            variant="secondary" 
            className="bg-primary/10 hover:bg-primary/20 transition-colors duration-300"
          >
            {tag}
          </Badge>
        ))}
      </div>
    </div>
  </div>
);

const Home = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="min-h-screen relative">
      <Socials />
      {/* Hero Section */}
      <section className="min-h-[95vh] flex items-center relative">
        <div className="max-w-6xl mx-auto px-6 py-12 relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-10">
              <div className="space-y-8 animate-fade-up">
                {/* Name with minimal glass effect */}
                <h1 className="text-4xl sm:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/80 to-secondary animate-gradient-x p-6 backdrop-blur-sm rounded-2xl whitespace-nowrap">
                  {aboutData.name}
                </h1>

                {/* Description with minimal glass effect */}
                <p className="text-xl text-muted-foreground/90 leading-relaxed max-w-2xl backdrop-blur-sm bg-background/5 p-6 rounded-2xl">
                  {aboutData.tagline}
                </p>

                {/* Badges with minimal glass container */}
                <div className="backdrop-blur-sm bg-background/5 p-6 rounded-2xl">
                  <div className="flex flex-wrap gap-3 justify-start">
                    {aboutData.roles.map((role) => (
                      <Badge key={role} variant="secondary" 
                        className="px-6 py-2 text-sm bg-primary/5 
                          hover:bg-primary/15 transition-all duration-300 
                          hover:scale-105">
                        {role}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Buttons with minimal glass container */}
                <div className="backdrop-blur-sm bg-background/5 p-6 rounded-2xl">
                  <div className="flex flex-row items-center justify-start gap-4">
                    {[
                      { icon: FileText, text: "View\nProjects", href: "/projects" },
                      { icon: Book, text: "Read\nBlog", href: "/blog" },
                      { icon: Archive, text: "Download\nResume" }
                    ].map(({ icon: Icon, text, href }) => {
                      const buttonClassName = `
                        inline-flex items-center gap-3 px-4 py-2 rounded-xl
                        bg-primary/5 hover:bg-primary/15
                        transition-all duration-300 text-sm font-medium
                        hover:scale-105 hover:shadow-lg hover:shadow-primary/5
                        w-32 justify-between min-h-[50px]
                        group relative overflow-hidden
                      `;
                      
                      const ButtonContent = () => (
                        <>
                          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          <Icon size={18} className="text-primary flex-shrink-0 relative z-10 group-hover:scale-110 transition-transform duration-300" />
                          <span className="whitespace-pre-line text-right leading-tight flex-grow relative z-10 group-hover:translate-x-1 transition-transform duration-300">{text}</span>
                        </>
                      );
                      
                      return href ? (
                        <a key={text} href={href} className="w-40">
                          <button className={buttonClassName}>
                            <ButtonContent />
                          </button>
                        </a>
                      ) : (
                        <button key={text} className={buttonClassName}>
                          <ButtonContent />
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative aspect-rectangle animate-float hidden lg:block">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-[2rem] blur-3xl animate-pulse-slow"></div>
              <img 
                src={aboutData.image}
                alt={aboutData.name}
                className="relative z-10 rounded-[2rem] object-cover w-full h-full cyber-border-advanced p-4 glass-card-modern shadow-2xl hover:scale-[1.02] transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Experience Timeline */}
      <section className="py-24 relative">
        <div className="max-w-5xl mx-auto px-6">
          <div className="space-y-16">
            <div className="space-y-4">
              <h2 className="text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
                Experience
              </h2>
              <p className="text-muted-foreground/80">My professional journey and achievements</p>
            </div>
            
            <div 
              className="group perspective-1000"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <Card className={cn(
                "p-8 backdrop-blur-lg bg-card/30",
                "hover:border-primary/20 transition-all duration-500",
                "transform-gpu rotate-y-0 hover:rotate-y-5",
                isHovered ? 'shadow-xl shadow-primary/10' : '',
                "cyber-card overflow-hidden",
                "rounded-2xl"
              )}>
                <div className="space-y-8">
                  {aboutData.experiences.map((exp: ExperienceItem, i: number) => (
                    <ExperienceCard key={i} experience={exp} />
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
